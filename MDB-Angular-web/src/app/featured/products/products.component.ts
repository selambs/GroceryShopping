import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

import { ServiceService } from "../../service/service.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public elements: string[];
  headElements: string[] = [
    "#",
    "FRAM NAME",
    "ITEM",
    "IMAGE",
    "PRICE",
    "DETAIL",
  ];

  constructor(private service: ServiceService, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.service
      .getProducts()
      .subscribe((product) => (this.elements = product["data"]));
  }

  editProduct(id, obj) {}

  deleteProduct(id) {
    this.service.deleteProductById(id).subscribe((productId) => {
      this.elements = this.elements.filter((elem: any) => elem._id !== id);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
