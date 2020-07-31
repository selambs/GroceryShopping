import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { ServiceService } from "src/app/service/service.service";

@Component({
  selector: "app-farmer-dashboard",
  templateUrl: "./farmer-dashboard.component.html",
  styleUrls: ["./farmer-dashboard.component.scss"],
})
export class FarmerDashboardComponent implements OnInit {
  constructor(private service: ServiceService, private router: Router) {}

  ngOnInit(): void {}
  
  logout() {
    this.service.logout();
    this.router.navigate(["/"]);
  }
}
