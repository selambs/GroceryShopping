import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

import { ServiceService } from "../service/service.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  elegantForm: FormGroup;
  errorMessege;

  constructor(
    public fb: FormBuilder,
    private service: ServiceService,
    private router: Router
  ) {
    this.elegantForm = fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.service.farmerLogin(this.elegantForm.value).subscribe((response) => {
      if (response["status"] == "failed") {
        this.errorMessege = response["messege"];
      }

      if (response["status"] == "ok") {
        this.service.storeToken(response["token"], response["role"]);
        if (response["role"] == "farmer") {
          this.router.navigate(["api", "farmer"]);
        } else if (response["role"] == "superuser") {
          this.router.navigate(["api", "superuser", "farmers"]);
        }
      }
    });
  }
}
