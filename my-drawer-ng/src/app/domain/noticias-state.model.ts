import {Injectable} from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of} from "rxjs";
import { map } from "rxjs/operators";

//ESTADO
export class Noticia{
    constructor(public titulo: string) {} 
}
//Tenemos un Store(objete de JS que almacena el estado), 
export interface NoticiasState {//por ende debo definir la interfaz de estado 
    items: Noticia[]; //tiene un Array de items
    sugerida: Noticia; //Una marcada oor defecto"Noticia" la cual es una clase que se tiene que definir(está arriba)
}

export function initializeNoticiasState(){
    return{
        items: [],
        sugerida: null

    };
}

//ACCIONES
export enum NoticiasActionTypes {
    INIT_MY_DATA = "[Noticias] init My Data",
    NUEVA_NOTICIA = "[Noticias] Nueva",
    SUGERIR_NOTICIA = "[Noticias] Sugerir"
}

export class InitMyDataAction implements Action {
    type= NoticiasActionTypes.INIT_MY_DATA;
    constructor(public titulares: Array<string>) {}
}

export class NuevaNoticiaAction implements Action {
    type= NoticiasActionTypes.NUEVA_NOTICIA;
    constructor(public noticia: Noticia) {}
}

export class SugerirAction implements Action {
    type = NoticiasActionTypes.SUGERIR_NOTICIA;
    constructor( public noticia: Noticia){}
}

export type NoticiasViajesActions = NuevaNoticiaAction | InitMyDataAction;

//REDUCERS 
/*la función que tienen es, dado un estado previo de la aplicación y una acción que acaba de suceder, 
que acaba de ser disparada por alguna acción del usuario, agarran el estado anterior de la aplicación 
y la acción que acaba de suceder y debe de retornar el nuevo estado. es el mismo tipo de dato.. */
export function reducersNoticias(
    state: NoticiasState,
    action: NoticiasViajesActions
): NoticiasState {
    switch (action.type){
        case NoticiasActionTypes.INIT_MY_DATA:{
            const titulares: Array<string> = (action as InitMyDataAction).titulares; //casteo, INDAGAR

            //la sintaxis de transformación de Javascript.
            /*con esta sintaxis lo que estamos diciendo es que vamos a retornar un nuevo objeto, una nueva 
            instancia, que es la clonación del objeto state. Y le vamos a agregar el valor de la propiedad items.*/
            return{
                ...state,
                items: titulares.map((t) => new Noticia(t))
            };
        }
        case NoticiasActionTypes.NUEVA_NOTICIA: {
            return {
                ...state, //clonamos el objeto state como estaba
                items: [...state.items, (action as NuevaNoticiaAction).noticia ] /*sobre escribimos 
                el estado del array items con el mismo estado y además una noticia más */
            };
        }
        case NoticiasActionTypes.SUGERIR_NOTICIA: {
                return {
                    ...state,
                    /*dejamos el state en el mismo estado que estaba antes, lo clonamos, o sea la variable 
                    items quedará como estaba antes por ejemplo y solo sobre escribimos la variable sugerida. */
                    sugerida: (action as SugerirAction).noticia
                    /*Siempre se hace el casteo del Action al tipo de acción concreto que corresponde y se 
                    manipulan los datos como corresponde */
                };
        }
    }
    return state; //si no se da ninguno de los cases retorna el estado sin mutar*
}


//EFFECTS
/*Luego de todos los reducers, se procesan los effects. Y el objeto de los effects es que, nunca conocen el 
estado, no son responsables de mutar el estado, para eso están los reducers pero sí son notificados de 
las acciones que fueron ocurriendo, Con la finalidad de analizar si dada una acción 
hay que disparar otra acción o invocar, ejecutar, algún service, algún objeto de nuestro dominio */
@Injectable()
export class NoticiasEffects {
    /*Entonces cuando hay una nueva noticia si llega algo que no es nueva noticia, no pasa de este off type, 
    no sigue procesando pero si llega algo que es una nueva noticia pasa a este nuevo paso, se trata esa 
    acción como una nueva noticia action es como el casteo seguro que hacíamos antes y aquí mapeamos, 
    creamos un sugerir, esto es una regla de negocio para, para esta demostración nada más. */
    @Effect()
    nuevoAgregado$: Observable<Action> = this.actions$.pipe(
        ofType(NoticiasActionTypes.NUEVA_NOTICIA),
        map((action: NuevaNoticiaAction) => new SugerirAction(action.noticia))
    );
    constructor(private actions$: Actions) {}
}