import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'ns-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})

export class SearchFormComponent implements OnInit{
  textFliedValue: string ="";

  /*"search", cuando este componente "search form" detecte que se ha cumplido la condición para 
  disparar una búsqueda y avisarle al componente padre, en esa situación tenemos que emitir un evento*/

  /*Por eso, el objeto se llama "EventEmitter", y por eso está anotado como tipo "Output". 
  Tipo "Output" tiene que estar anotado para que donde usemos esto sepan que van a tener que usar paréntesis, 
  "search" entre paréntesis, para indicar el código a ejecutar cuando se dispare este evento */
  @Output() search: EventEmitter<string> = new EventEmitter();
  @Input() inicial : string;

  onButtonTap(): void{
    console.dir(this.textFliedValue);
    //if(this.textFliedValue.length>2){
      this.search.emit(this.textFliedValue);
    //}
  }

  constructor() { }

  ngOnInit() {
    //this.textFliedValue = this.inicial;
  }

}