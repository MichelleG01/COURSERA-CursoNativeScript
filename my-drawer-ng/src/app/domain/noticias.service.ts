import { Injectable } from "@angular/core";
import {getJSON, request } from "@nativescript/core/http"; //tecnologia de consultas en la web
const sqlite = require("nativescript-sqlite"); //indica que esta clase va a ser inyectada a distintos 
//comoinentes que van a declarar su dependencia en esta clase através de recibir una variable de este tipo en 
//su constructor

@Injectable()
export class NoticiasService{
    api: string ="https://4ceaf1f3d1f4.ngrok.io";

    private noticias: Array<string> = [];

    agregar(s: string){ //metodo para agregar en el array
        return request({
            url: this.api + "/favs",
            method: "POST",
            headers: {"Content-Type": "application/json" },
            content: JSON.stringify({
                nuevo: s
            })
        });
    }

    favs() {
        return getJSON(this.api + "/favs");
    }

    buscar(s: string){
        return getJSON(this.api + "/get?q=" + s); // esta consulta la hacemos con el get JSON que importamos arriba con el core module.
        //retorna una promesa. donde nosotros, cuando lleguemos al "buscar", cuando consumamos el "buscar", 
        //podremos usar el método "then" de toda promesa de JavaScript, para actuar ante condiciones favorables 
        //o desfavorables, de éxito o de error
    }
}