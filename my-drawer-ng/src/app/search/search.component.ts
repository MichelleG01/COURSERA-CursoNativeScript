import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import * as Toast from "nativescript-toasts";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application, Color, View } from "@nativescript/core";
import { NoticiasService } from "../domain/noticias.service";
import { RouterExtensions } from "@nativescript/angular";
import * as SocialShare from "nativescript-social-share";
import { Store } from "@ngrx/store";
import { AppState } from "../app.module";
import { Noticia, NuevaNoticiaAction } from "../domain/noticias-state.model";

@Component({
    selector: "Search", //esto crea un "tag" HTML, similar al HTML, en realidad es un "tag" XML, 
    //en donde nosotros vamos a poder instanciar, desde otros controles, a este control
    moduleId: module.id,
    templateUrl: "./search.component.html", //aqui es donde se define, por más que la extensión sea HTML, 
    //en NativeScript, el código que se contiene dentro de estos archivos HTML es un XML, porque no estamos 
    //en un navegador web, sino que estamos en una aplicación "mobile"
    //providers: [NoticiasService] // provider de manera loca
})
export class SearchComponent implements OnInit {
    resultados : Array<string>;
    @ViewChild("layout") layout: ElementRef; //indicamos el nombre de la variable de la vista

    constructor(private noticias: NoticiasService, private routerExtensions: RouterExtensions,
        private store: Store<AppState> //redux
        ) {//construcor que recibe variable de "noticias.services.ts", si no se importa esta clase automaticamente, debe importarse arriba*
        //La variable noticias se podrá usar en todo este componente, y en el html
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        /*console.log("adasd");
        console.log({nombre: {nombre: {nombre: {nombre: "pepe"}}}});
        console.log({nombre: {nombre: {nombre: {nombre: "pepe"}}}});
        console.log([1,2,3]);
        console.dir([4,5,6]);*/

        /*this.noticias.agregar("hola");
        this.noticias.agregar("hola 2");
        this.noticias.agregar("hola 3");*/
        this.store.select((state) => state.noticias.sugerida)
        .subscribe((data) => {
            const f = data;
            if (f != null) {
                Toast.show({text: "Sugerimos leer: " + f.titulo, duration: Toast.DURATION.SHORT});
            }
        })
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }

    onItemTap(args):void{
        this.store.dispatch(new NuevaNoticiaAction(new Noticia(args.view.bindingContext)));
    }

    onDelete(item): void {
        this.resultados.splice(item, 1);
        alert('Se elimino el item ' + item);

    }

    onDetalle(item):void {
        alert('Mostrar los detalles del elemento ' + item);
    }

    onLongPress(s) {
        console.log(s);
        SocialShare.shareText(s, "Asunto: Compartido desde el curso!");
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
        /*this.resultados = this.noticias.buscar().filter((x)=> x.indexOf(s)>= 0);
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
        }))*/
        console.dir("buscarAhora"+ s); //ENtra al buscarAhora
        this.noticias.buscar(s).then((r: any) => {//luego, llamamos a buscar(el del search module) nos retorna una promesa, y sobre la promesa llamamos al mpetodo THEN
            console.log("resultados buscarAhora:" + JSON.stringify(r));// tenemos dos callbacks aquí: 1cuando llega el resultado el retorno favorable, lo mostramos por consola y lo asignamos a resultados(Variable del front end)
            this.resultados =r; 
        }, (e) => {//2. En caso de error, también lo logueamos y usamos en Toast
            console.log("error buscarAhora" + e);
            Toast.show({text: "Error en la búsqueda", duration: Toast.DURATION.SHORT}); //por si hay un error en la
            //consulta de la api
        });
    }
}
