import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NewsComponent } from './news/news.component';

@NgModule({ //este es un modulo raiz
    bootstrap: [ //con esto se inicializa el modulo
        AppComponent // ese modulo llama a su componente bootstrapeable, que es el primer componente 
        //que se va a dibujar, renderear en la interfaz de usuario
    ],
    imports: [ //ademas usa estos otros modulos
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptUISideDrawerModule
    ],
    declarations: [ //las declaraciones son los componentes, directivas y pipes, que este módulo declara 
        //para ser usadas por otros módulos.
        AppComponent //Los componentes son todo lo que tiene connotación gráfica, todo lo que tiene que ser 
        //rendereado, dibujado en la interfaz.
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
