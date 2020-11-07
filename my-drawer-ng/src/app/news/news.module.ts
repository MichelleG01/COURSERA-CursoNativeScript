import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular/common';


import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from "./news.component";


@NgModule({
  declarations: [
    NewsComponent,
  ],
  imports: [
    NewsRoutingModule,
    NativeScriptCommonModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class NewsModule { }