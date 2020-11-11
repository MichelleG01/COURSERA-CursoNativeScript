import {Injectable} from "@angular/core";


Injectable()
export class DetalleService{
    private detalles: Array<string> = [];

    agregar(s: string){
        this.detalles.push(s);
    }

    buscar(){
        return this.detalles;
    }
}