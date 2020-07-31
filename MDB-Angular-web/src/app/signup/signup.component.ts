import { Component } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

import { ServiceService } from "../service/service.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent {
  public elegantForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    private service: ServiceService,
    private router: Router
  ) {
    this.elegantForm = fb.group({
      companyname: ["", Validators.required],
      owner: ["", Validators.required],
      logo: ["", Validators.required],
      address: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
    // this.elegantForm.valueChanges.subscribe((data) => console.log(data));
  }

  onSubmit(imageFile) {
    const farmerInput = new FormData();

    farmerInput.append("companyname", this.elegantForm.value.companyname);
    farmerInput.append("owner", this.elegantForm.value.owner);
    farmerInput.append("logo", imageFile.files[0], imageFile.files[0]["name"]);
    farmerInput.append("address", this.elegantForm.value.address);
    farmerInput.append("email", this.elegantForm.value.email);
    farmerInput.append("password", this.elegantForm.value.password);

    this.service.farmerSignup(farmerInput).subscribe();

    this.router.navigate([""]);
  }
}
