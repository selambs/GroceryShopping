import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { ServiceService } from "src/app/service/service.service";

@Component({
  selector: "app-customers-list",
  templateUrl: "./customers-list.component.html",
  styleUrls: ["./customers-list.component.scss"],
})
export class CustomersListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public customers;

  public customerElements = [
    "#",
    "FIRST NAME",
    "LAST NAME",
    "EMAIL",
    "ACTIVE",
    "MANAGE ACCOUNT",
  ];

  constructor(private service: ServiceService) {}
  ngOnInit(): void {
    this.subscription = this.service
      .superuserDashBored()
      .subscribe((response) => {
        this.customers = response["customers"];
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
