import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";

import { ServiceService } from "src/app/service/service.service";

@Component({
  selector: "app-manage-account",
  templateUrl: "./manage-account.component.html",
  styleUrls: ["./manage-account.component.scss"],
})
export class ManageAccountComponent implements OnInit {
  elegantForm: FormGroup;
  userdata;

  constructor(
    private router: Router,
    private service: ServiceService,
    private fb: FormBuilder
  ) {
    this.userdata = this.router.getCurrentNavigation().extras.state.userdata;

    this.elegantForm = this.fb.group({
      password: this.userdata.password,
      active: this.userdata.active,
    });
  }
  ngOnInit(): void {}

  onSubmit() {
    this.service
      .superuserResestPassword(this.userdata._id, this.elegantForm.value)
      .subscribe();
    this.service
      .superuserActivateAccount(this.userdata._id, this.elegantForm.value)
      .subscribe();
    this.router.navigate(["api", "superuser", "farmers"]);
  }
}
