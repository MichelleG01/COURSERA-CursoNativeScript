import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application } from "@nativescript/core";

@Component({
    selector: "Search", //esto crea un "tag" HTML, similar al HTML, en realidad es un "tag" XML, 
    //en donde nosotros vamos a poder instanciar, desde otros controles, a este control
    templateUrl: "./search.component.html" //aqui es donde se define, por más que la extensión sea HTML, 
    //en NativeScript, el código que se contiene dentro de estos archivos HTML es un XML, porque no estamos 
    //en un navegador web, sino que estamos en una aplicación "mobile"
})
export class SearchComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        console.log("adasd");
        console.log({nombre: {nombre: {nombre: {nombre: "pepe"}}}});
        console.log({nombre: {nombre: {nombre: {nombre: "pepe"}}}});
        console.log([1,2,3]);
        console.dir([4,5,6]);
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }
}
