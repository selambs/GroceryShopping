import { Component, OnInit } from "@angular/core";
import { style } from "@angular/animations";

@Component({
  selector: "app-notfound",
  template: `<h1
    style=" margin-top: 200px;
  font-size: 100px;
  background-color: black;"
  >
    Page Not Found
  </h1>`,
})
export class NotfoundComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
