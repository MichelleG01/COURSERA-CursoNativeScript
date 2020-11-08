import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular/router';

import {DocumentsComponent} from './documents.component';

const routes: Routes = [
{ path : "", component : DocumentsComponent}

];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class DocumentsRoutingModule { }