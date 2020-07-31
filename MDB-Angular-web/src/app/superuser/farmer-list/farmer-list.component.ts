import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { ServiceService } from "src/app/service/service.service";

@Component({
  selector: "app-farmer-list",
  templateUrl: "./farmer-list.component.html",
  styleUrls: ["./farmer-list.component.scss"],
})
export class FarmerListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public farmers;

  public farmerElements = [
    "#",
    "COMPANY NAME",
    "OWNER",
    "EMAIL",
    "ACTIVE",
    "MANAGE ACCOUNT",
  ];

  constructor(private service: ServiceService) {}
  ngOnInit(): void {
    this.subscription = this.service
      .superuserDashBored()
      .subscribe((response) => {
        this.farmers = response["farmers"];
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
