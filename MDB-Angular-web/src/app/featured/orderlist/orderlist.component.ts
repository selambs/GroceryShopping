import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

import { ServiceService } from "src/app/service/service.service";

@Component({
  selector: "app-orderlist",
  templateUrl: "./orderlist.component.html",
  styleUrls: ["./orderlist.component.scss"],
})
export class OrderlistComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  public orderElements = ["ITEM NAME(QTY)", "CHANGE ORDER STATUS"];
  public orders;
  //a variable to get the full data
  public storeOrderData;

  public filterStatus;

  constructor(private service: ServiceService, private route: Router) {}

  ngOnInit(): void {
    this.subscription = this.service.getOrderList().subscribe((orders) => {
      this.orders = orders["orderList"];
      this.storeOrderData = orders["orderList"];
    });
  }

  filterByStatus(e) {
    this.orders = this.storeOrderData.filter(
      (item) => item.orderStatus == e.target.value
    );
  }

  onSubmit(e, orderid) {
    this.service.updateStatus(orderid, e.target.value).subscribe();
    // setTimeout(()=>{},1000)
    this.route.navigateByUrl("api/farmer/orders");
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
