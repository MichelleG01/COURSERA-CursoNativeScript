import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "@nativescript/core/application";
import * as Toast from 'nativescript-toast';
import { ActivityIndicator } from '@nativescript/core';

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
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }

  cambio(e){
    let indicator=<ActivityIndicator>e.object;
    console.log("indicador busy: " + indicator.busy);
  }

}