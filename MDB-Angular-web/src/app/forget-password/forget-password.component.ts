import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { ServiceService } from "../service/service.service";

@Component({
  selector: "app-forget-password",
  templateUrl: "./forget-password.component.html",
  styleUrls: ["./forget-password.component.scss"],
})
export class ForgetPasswordComponent implements OnInit {
  elegantForm: FormGroup;
  constructor(private fb: FormBuilder, private service: ServiceService) {
    this.elegantForm = this.fb.group({
      email: ["", Validators.required],
    });
  }

  ngOnInit(): void {}
  
  onSubmit() {
    // console.log(this.elegantForm.value.email);
    this.service.forgetPassword(this.elegantForm.value).subscribe();
  }
}
