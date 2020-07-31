import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { ServiceService } from "src/app/service/service.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
})
export class ResetPasswordComponent implements OnInit {
  elegantForm: FormGroup;
  successMessege;

  constructor(
    private fb: FormBuilder,
    private service: ServiceService,
    private router: Router
  ) {
    this.elegantForm = fb.group({
      newPassword: ["", Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.service
      .resetPassword(this.elegantForm.value)
      .subscribe((response) => (this.successMessege = response["messege"]));
    setTimeout(() => {
      this.router.navigateByUrl("api/farmer");
    }, 2000);
  }
}
