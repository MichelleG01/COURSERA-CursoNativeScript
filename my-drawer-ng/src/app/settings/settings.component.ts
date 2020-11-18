import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application, Dialogs } from "@nativescript/core";

let LS = require("nativescript-localstorage");

@Component({
    selector: "Settings",
    templateUrl: "./settings.component.html"
})
export class SettingsComponent implements OnInit {
    nombreUsuario: string;

    constructor() {
        // Use the component constructor to inject providers.
    }

    doLater(fn) {
        setTimeout(fn,1000);
    }

    ngOnInit(): void {
        // Init your component properties here.
        this.doLater(()=>
            Dialogs.action("Mensaje","Cancelar", ["Opcion1","Opcion2"]) //le indicamos al usuario que debe
            //seleccionar una opcion
            .then((result) => { //devuelve un "promise" de JavaScript donde nos pone el "result"
                console.log("resultado: "+ result);
                if(result === "Opcion1"){
                    this.doLater(()=>
                    /*si queremos abrir otro diálogo no se va a poder, entonces, por eso es que 
                    introducimos la función "doLater". También nos sirve porque el dialog lo tenemos que 
                    abrir luego de que ejecutó el "ngOnInit"*/
                    Dialogs.alert({
                        title: "Titulo 1",
                        message: "Mensaje 1",
                        okButtonText: "Boton 1"
                    }).then(()=> console.log("Cerrado 1!")));
                } else if(result === "Opcion2"){
                    this.doLater(()=>
                    Dialogs.alert({
                        title: "Titulo 2",
                        message: "Mensaje 2",
                        okButtonText: "Boton 2"
                    }).then(()=> console.log("Cerrado 2!")));
                }}

            ));
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }

    onTapButton(): void {
        console.log(this.nombreUsuario);
        LS.setItem("nombreUsuario", this.nombreUsuario);
    }
}
