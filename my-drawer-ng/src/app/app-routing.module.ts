import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", loadChildren: () => import("~/app/home/home.module").then((m) => m.HomeModule) },
    { path: "browse", loadChildren: () => import("~/app/browse/browse.module").then((m) => m.BrowseModule) },
    { path: "search", loadChildren: () => import("~/app/search/search.module").then((m) => m.SearchModule) },
    { path: "featured", loadChildren: () => import("~/app/featured/featured.module").then((m) => m.FeaturedModule) },
    { path: "settings", loadChildren: () => import("~/app/settings/settings.module").then((m) => m.SettingsModule) },
    { path: "news", loadChildren: () => import("~/app/news/news.module").then(m => m.NewsModule) },
    { path: "documents", loadChildren:()=> import("~/app/documents/documents.module").then(m=>m.DocumentsModule)},
    { path: "share", loadChildren:() => import("~/app/share/share.module").then(m=>m.ShareModule)}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)], //"forRoot", es está configurando el enrutador raíz de la aplicación Mobile.
    //El objeto "routes" es un objeto siguiendo las convenciones de Angular. Es un "array" de objetos, donde esos objetos tienen que 
    //tener siempre un atributo "path", que es un "string", que es el nombre de la ruta.
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
