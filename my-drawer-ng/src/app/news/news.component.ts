import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application } from "@nativescript/core";
//import * as app from "tns-core-modules/application";
import * as Toast from 'nativescript-toast';

@Component({
  selector: 'News',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor() { }

  doLater(fn) {setTimeout(fn,1000);}

  ngOnInit() {

    //const ToastOptions: Toast.ToastOptions = {text: "Hello", duration: Toast.DURATION_SHORT};

    var toast = Toast.makeText("Hello World");
    this.doLater(() => toast.show());

  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.showDrawer();
}

}