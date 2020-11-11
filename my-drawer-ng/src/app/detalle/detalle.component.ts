import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from "@nativescript/core/application";
import { DetalleService } from "../domain/detalle.service";

@Component({
  selector: 'ns-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
  providers: [DetalleService] // agregado provider-- local solo a este componente.
})
export class DetalleComponent implements OnInit {

  constructor( private detalles : DetalleService, private router:Router) { }

  ngOnInit() {
    this.detalles.agregar("detalle 1");
    this.detalles.agregar("detalle 2");
    this.detalles.agregar("detalle 3");

  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
}


refreshList(args) {
  //https://github.com/nstudio/nativescript-pulltorefresh
  const pullRefresh = args.object;
  setTimeout(function () {
     pullRefresh.refreshing = false;
  }, 1000);
}

}