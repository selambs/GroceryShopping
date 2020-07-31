import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import {
  CheckboxModule,
  WavesModule,
  ButtonsModule,
  InputsModule,
  IconsModule,
  CardsModule,
  MDBBootstrapModule,
} from "angular-bootstrap-md";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { ManageAccountComponent } from "./superuser/manage-account/manage-account.component";
import { FarmerListComponent } from "./superuser/farmer-list/farmer-list.component";
import { CustomersListComponent } from "./superuser/customers-list/customers-list.component";
import { NotfoundComponent } from "./notfound/notfound.component";

import { MyInterceptorInterceptor } from "./interceptor/my-interceptor.interceptor";
import { ForgetPasswordComponent } from "./forget-password/forget-password.component";
import { LogfileComponent } from "./superuser/logfile/logfile.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ManageAccountComponent,
    FarmerListComponent,
    CustomersListComponent,
    NotfoundComponent,
    ForgetPasswordComponent,
    LogfileComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: "", component: LoginComponent },
      {
        path: "api",
        loadChildren: () =>
          import("../app/featured/featured.module").then(
            (m) => m.FeaturedModule
          ),
      },
      { path: "api/farmer/signup", component: SignupComponent },
      { path: "api/forgetpassword", component: ForgetPasswordComponent },
      { path: "**", component: NotfoundComponent },
    ]),
    CheckboxModule,
    WavesModule,
    ButtonsModule,
    InputsModule,
    IconsModule,
    CardsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptorInterceptor,
      multi: true,
    },
  ],
  exports: [
    FarmerListComponent,
    CustomersListComponent,
    ManageAccountComponent,
    LogfileComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
