import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { Router } from "@angular/router";

const BASEURL = "http://localhost:3000/api";

@Injectable({
  providedIn: "root",
})
export class ServiceService {
  private token;
  private role;

  constructor(private http: HttpClient, private router: Router) {
    this.token = localStorage.getItem("token");
  }

  getToken() {
    return of(this.token);
  }

  storeToken(token, role) {
    this.token = token;
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
  }

  farmerSignup(obj) {
    return this.http.post(`${BASEURL}/farmer/signup`, obj);
  }

  farmerLogin(obj) {
    return this.http.post(`${BASEURL}/farmer/signin`, obj);
  }

  getProducts() {
    return this.http.get(`${BASEURL}/farmer/product`);
  }

  addProduct(obj) {
    return this.http.post(`${BASEURL}/farmer/product`, obj);
  }

  deleteProductById(id) {
    return this.http.delete(`${BASEURL}/farmer/product/${id}`);
  }

  editProduct(id, obj) {
    return this.http.put(`${BASEURL}/farmer/product/${id}`, obj);
  }

  getOrderList() {
    return this.http.get(`${BASEURL}/farmer/orders`);
  }

  updateStatus(orderid, orderStatus) {
    return this.http.put(`${BASEURL}/farmer/orders/${orderid}`, {
      orderStatus: orderStatus,
    });
  }

  resetPassword(obj) {
    return this.http.put(`${BASEURL}/farmer/resetpassword`, obj);
  }

  forgetPassword(obj) {
    return this.http.put(`${BASEURL}/forgetpassword`, obj);
  }

  //************************************************************SUPER USER******************************************************
  superuserDashBored() {
    return this.http.get(`${BASEURL}/superuser`);
  }

  superuserResestPassword(id, obj) {
    return this.http.put(`${BASEURL}/superuser/user/${id}`, obj);
  }

  superuserActivateAccount(id, obj) {
    return this.http.put(`${BASEURL}/superuser/users/${id}`, obj);
  }

  superuserGetLogfile() {
    return this.http.get(`${BASEURL}/superuser/logfile`);
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    this.token = null;
    this.role = null;
    this.router.navigate([""]);
  }
}
