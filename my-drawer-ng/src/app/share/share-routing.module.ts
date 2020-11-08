import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular/router';

import {ShareComponent} from './share.component';


const routes: Routes = [
  {path:"", component : ShareComponent}
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class ShareRoutingModule { }