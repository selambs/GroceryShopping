import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

import { ServiceService } from "src/app/service/service.service";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.scss"],
})
export class AddProductComponent implements OnInit {
  public productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: ServiceService,
    private router: Router
  ) {
    this.productForm = fb.group({
      itemName: ["", Validators.required],
      image: ["", Validators.required],
      price: ["", Validators.required],
      inventory: ["", Validators.required],
      detail: ["", Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(imageFile) {
    const farmerInput = new FormData();

    farmerInput.append("itemName", this.productForm.value.itemName);
    farmerInput.append(
      "productImage",
      imageFile.files[0],
      imageFile.files[0]["name"]
    );
    farmerInput.append("price", this.productForm.value.price);
    farmerInput.append("inventory", this.productForm.value.inventory);
    farmerInput.append("detail", this.productForm.value.detail);

    this.service.addProduct(farmerInput).subscribe();

    this.router.navigateByUrl("api/farmer");
  }
}
