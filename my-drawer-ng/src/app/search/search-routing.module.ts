import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { DetalleComponent } from "../detalle/detalle.component";

import { SearchComponent } from "./search.component";

const routes: Routes = [
    { path: "", component: SearchComponent },
    { path: "detalle", component: DetalleComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class SearchRoutingModule { }
