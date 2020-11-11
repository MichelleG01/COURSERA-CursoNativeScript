import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { DetalleComponent } from "../detalle/detalle.component";
import { NoticiasService } from "../domain/noticias.service";

import { SearchRoutingModule } from "./search-routing.module";
import { SearchComponent } from "./search.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SearchRoutingModule
    ],
    declarations: [
        SearchComponent,
        DetalleComponent
    ],
    //providers: [NoticiasService], //para que más de un módulo pueda usar este "NoticiasService" 
    //sin necesidad de tener que poner cada uno su propio "providers".
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SearchModule { }
