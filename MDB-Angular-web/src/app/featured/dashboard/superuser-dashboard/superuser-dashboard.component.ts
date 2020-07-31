import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { ServiceService } from "src/app/service/service.service";

@Component({
  selector: "app-superuser-dashboard",
  templateUrl: "./superuser-dashboard.component.html",
  styleUrls: ["./superuser-dashboard.component.scss"],
})
export class SuperuserDashboardComponent implements OnInit {
  constructor(private service: ServiceService, private router: Router) {}

  ngOnInit(): void {}
  logout() {
    this.service.logout();
    this.router.navigate(["/"]);
  }
}
