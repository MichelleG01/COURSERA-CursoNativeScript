import { Injectable } from "@angular/core";
import {getJSON, request } from "@nativescript/core/http"; //tecnologia de consultas en la web
const sqlite = require("nativescript-sqlite"); //indica que esta clase va a ser inyectada a distintos 
//comoinentes que van a declarar su dependencia en esta clase através de recibir una variable de este tipo en 
//su constructor

@Injectable()
export class NoticiasService{
    api: string ="https://4ceaf1f3d1f4.ngrok.io";

    private noticias: Array<string> = [];

    constructor(){
        this.getDb((db)=>{
            console.dir(db);
            //each ejecuta una consulta contra la base de datos. Esto va a devolver cero, una, o más filas. 
            //Y por cada una de esas filas, llama a esa primera "function", a esta primera "fatal row function", 
            //ese "callback"
            db.each("select * from logs",
            (err, fila) => console.log("fila: ", fila),
            //la sgt llamada se hace después de que se llamó la anterior, por cada fila, a esta primer función.
            (err, totales) => console.log("Filas totales: ", totales));
        },() => console.log("error on getDB"));
    }

    getDb(fnOk, fnError) {
        return new sqlite("mi_db_logs", (err,db) => { //instancia para una conexion con db de SQlite con el 
            //primer parametro(Nombre db)

            //lo ideal es que toda interacción con una tabla esté siempre centralizada en un único servicio, 
            //lo que nos tenemos que garantizar es que exista esa tabla en esa base de datos
            if (err) { // ver si no está el "flag" de error levantado. Si está, "logueamos" ese error.
                console.error("Error al abrir db!", err);
            } else {
                console.log("Está la db abierta: ", db.isOpen() ? "Si":"No");
                db.execSQL("CREATE TABLE IF NOT EXISTS logs (id INTEGER PRIMARY KEY AUTOINCREMENT, texto TEXT)") //creamos
                //una "SQL" a modo preventivo para crear la tabla de la base de datos que nosotros necesitamos
                    .then((id)=> {//AUTOINCREMENT incrementa el id automaticamente
                        console.log("CREATE TABLE OK");
                        fnOk(db);
                    }, (error) => {
                        console.log("CREATE TABLE ERROR", error);
                        fnError(error);
                    
                    });
            }
            
        });
    }

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

    buscar(s: string){//recibe un string de busqueda y llamamos al api con  /get y q(query/consulta) 
        //..mas el string(s) que ingresaron para consultar
        this.getDb((db) =>{ //hacemos un insert en la DB
            db.execSQL("insert into logs (texto) values (?)", [s],
            (err, id) => console.log("nuevo id: ", id));
        }, () => console.log("error on getDB"));

        return getJSON(this.api + "/get?q=" + s); // esta consulta la hacemos con el get JSON que importamos arriba con el core module.
        //retorna una promesa. donde nosotros, cuando lleguemos al "buscar", cuando consumamos el "buscar", 
        //podremos usar el método "then" de toda promesa de JavaScript, para actuar ante condiciones favorables 
        //o desfavorables, de éxito o de error
    }
}