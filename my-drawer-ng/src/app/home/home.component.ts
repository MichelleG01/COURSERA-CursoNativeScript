import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application } from "@nativescript/core";
import * as camera from "nativescript-camera";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }

    onButtonTap(): void {
        camera.requestPermissions().then( //Solicitamos permisos
            function sucess() { //aceptacion por parte del usuario
                //si acepta tomamos una foto, config las opciones del tamaño
                const options = { width: 300, height: 300, keepAspectRatio: false, saveToGallery: true};
                camera.takePicture(options).
                    then((imageAsset) => {
                        console.log("Tamaño: " + imageAsset.options.width + "x" + imageAsset.options.height);
                        console.log("keepAspectRatio: " + imageAsset.options.keepAspectRatio);
                        console.log("Foto guardada");
                    }).catch((err) => {
                        console.log("Error -> " + err.message);
                    });
            },
            function failure() { //no aceptacion por parte del usuario
                console.log("Permiso de camara no aceptado por el usuario");
            }
        );
    }
}
