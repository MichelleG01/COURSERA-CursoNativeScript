import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application, Color, View } from "@nativescript/core";
import { NoticiasService } from "../domain/noticias.service";
import { RouterExtensions } from "@nativescript/angular";

@Component({
    selector: "Search", //esto crea un "tag" HTML, similar al HTML, en realidad es un "tag" XML, 
    //en donde nosotros vamos a poder instanciar, desde otros controles, a este control
    templateUrl: "./search.component.html", //aqui es donde se define, por más que la extensión sea HTML, 
    //en NativeScript, el código que se contiene dentro de estos archivos HTML es un XML, porque no estamos 
    //en un navegador web, sino que estamos en una aplicación "mobile"
    //providers: [NoticiasService] // provider de manera loca
})
export class SearchComponent implements OnInit {
    resultados : Array<string>;
    @ViewChild("layout") layout: ElementRef; //indicamos el nombre de la variable de la vista

    constructor( private noticias: NoticiasService, private routerExtensions: RouterExtensions ) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        /*console.log("adasd");
        console.log({nombre: {nombre: {nombre: {nombre: "pepe"}}}});
        console.log({nombre: {nombre: {nombre: {nombre: "pepe"}}}});
        console.log([1,2,3]);
        console.dir([4,5,6]);*/

        this.noticias.agregar("hola");
        this.noticias.agregar("hola 2");
        this.noticias.agregar("hola 3");
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }

    onItemTap(x):void{
        console.dir(x);
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });

        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.closeDrawer();
    }

    buscarAhora(s:string){
        this.resultados = this.noticias.buscar().filter((x)=> x.indexOf(s)>= 0);
        //ejecutar animacion luego del buscar
        const layout_native_element = <View>this.layout.nativeElement;
        var enums = require("tns-core-modules/ui/enums");
        layout_native_element.animate({
            backgroundColor: new Color("Green"),
            duration: 300,
            delay: 150,
            iterations: 2,
            translate: { x: 0, y: 100},
            curve: enums.AnimationCurve.easeIn
        }).then( () => layout_native_element.animate({ //despies de retornar la promesa
            backgroundColor: new Color("Black"),
            duration: 300,
            delay: 150
        }))
    }
}
