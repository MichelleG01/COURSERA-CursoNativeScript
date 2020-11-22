import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";
import { EffectsModule } from "@ngrx/effects";
import { ActionReducerMap, StoreModule as NgRxStoreModule } from "@ngrx/store";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { 
    initializeNoticiasState, 
    NoticiasEffects, 
    NoticiasState, 
    reducersNoticias 
} from "./domain/noticias-state.model";
import { NoticiasService } from "./domain/noticias.service";

//es una buena practica tener un estado global a parte del que esta en noticias-state.model.ts
//estas lineas de codigo son bueno ponerlas en otro archivo
//redux init
export interface AppState {
    noticias: NoticiasState;
}

//Una función de reducción por cada funcionalidad, por cada "feature".
const reducers: ActionReducerMap<AppState> = {
    noticias: reducersNoticias
};

//tenemos que inicializar el "store", con un valor por defecto. Este tipo de dato tiene que ser de la interfaz, 
//tiene que ser del tipo de datos, tiene que ser compatible con esta interfaz
const reducersInitialState = {
    noticias: initializeNoticiasState()
};
//redux fin

@NgModule({ //este es un modulo raiz
    bootstrap: [ //con esto se inicializa el modulo
        AppComponent // ese modulo llama a su componente bootstrapeable, que es el primer componente 
        //que se va a dibujar, renderear en la interfaz de usuario
    ],
    imports: [ //ademas usa estos otros modulos
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptUISideDrawerModule,
        NgRxStoreModule.forRoot(reducers, { initialState: reducersInitialState}), //debe estar importado arriba
        EffectsModule.forRoot([NoticiasEffects])
    ],
    providers: [NoticiasService], //forma global
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
