import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import {
  CheckboxModule,
  WavesModule,
  ButtonsModule,
  InputsModule,
  IconsModule,
  CardsModule,
  MDBBootstrapModule,
} from "angular-bootstrap-md";

import { ProductsComponent } from "./products/products.component";
import { AuthorizationGuard } from "../guards/authorization.guard";
import { EditProductComponent } from "./edit-product/edit-product.component";
import { AddProductComponent } from "./add-product/add-product.component";
import { OrderlistComponent } from "./orderlist/orderlist.component";
import { ManageAccountComponent } from "../superuser/manage-account/manage-account.component";
import { FarmerDashboardComponent } from "./dashboard/farmer-dashboard/farmer-dashboard.component";
import { SuperuserDashboardComponent } from "./dashboard/superuser-dashboard/superuser-dashboard.component";
import { FarmerListComponent } from "../superuser/farmer-list/farmer-list.component";
import { CustomersListComponent } from "../superuser/customers-list/customers-list.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { NotfoundComponent } from "../notfound/notfound.component";
import { LogfileComponent } from '../superuser/logfile/logfile.component';

@NgModule({
  declarations: [
    ProductsComponent,
    EditProductComponent,
    AddProductComponent,
    OrderlistComponent,
    FarmerDashboardComponent,
    SuperuserDashboardComponent,
    FarmerDashboardComponent,
    SuperuserDashboardComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forChild([
      {
        path: "",
        component: FarmerDashboardComponent,
        children: [
          {
            path: "farmer",
            component: ProductsComponent,
            canActivate: [AuthorizationGuard],
          },
          {
            path: "farmer/product",
            component: AddProductComponent,
            canActivate: [AuthorizationGuard],
          },
          {
            path: "farmer/product/:id",
            component: EditProductComponent,
            canActivate: [AuthorizationGuard],
          },
          {
            path: "farmer/orders",
            component: OrderlistComponent,
            canActivate: [AuthorizationGuard],
          },
          {
            path: "farmer/resetpassword",
            component: ResetPasswordComponent,
            canActivate: [AuthorizationGuard],
          },
        ],
      },
      {
        path: "",
        component: SuperuserDashboardComponent,
        children: [
          {
            path: "superuser/farmers",
            component: FarmerListComponent,
          },
          {
            path: "superuser/customers",
            component: CustomersListComponent,
          },
          {
            path: "superuser/farmers/resetpassword",
            component: ManageAccountComponent,
            canActivate: [AuthorizationGuard],
          },
          {
            path: "superuser/customers/resetpassword",
            component: ManageAccountComponent,
            canActivate: [AuthorizationGuard],
          },
          {
            path: "superuser/logfile",
            component: LogfileComponent,
            canActivate: [AuthorizationGuard],
          },
        ],
      },
    ]),
    FormsModule,
    ReactiveFormsModule,
    CheckboxModule,
    WavesModule,
    ButtonsModule,
    InputsModule,
    IconsModule,
    CardsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FeaturedModule {}
