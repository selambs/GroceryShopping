import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";

import { ServiceService } from "src/app/service/service.service";

@Component({
  selector: "app-edit-product",
  templateUrl: "./edit-product.component.html",
  styleUrls: ["./edit-product.component.scss"],
})
export class EditProductComponent implements OnInit {
  public productForm: FormGroup;
  product;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: ServiceService
  ) {
    this.product = this.router.getCurrentNavigation().extras.state.item;
    this.productForm = fb.group({
      itemName: this.product.itemName,
      image: this.product.image,
      price: this.product.price,
      inventory: this.product.inventory,
      detail: this.product.detail,
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.service
      .editProduct(this.product._id, this.productForm.value)
      .subscribe();
    this.router.navigateByUrl("api/farmer");
  }
}
