import { Component, OnInit, OnDestroy } from "@angular/core";
import { ServiceService } from "src/app/service/service.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-logfile",
  templateUrl: "./logfile.component.html",
  styleUrls: ["./logfile.component.scss"],
})
export class LogfileComponent implements OnInit, OnDestroy {
  logfile;
  subscription: Subscription;
  headElements = ["Request Logs"];
  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.service
      .superuserGetLogfile()
      .subscribe((data) => (this.logfile = data["data"]));
  }
  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
