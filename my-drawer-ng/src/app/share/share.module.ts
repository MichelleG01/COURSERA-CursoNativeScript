import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { ShareRoutingModule } from './share-routing.module';
import { NativeScriptCommonModule } from '@nativescript/angular/common';
import { ShareComponent } from './share.component';


@NgModule({
  declarations: [ShareComponent],
  imports: [
    ShareRoutingModule,
    NativeScriptCommonModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ShareModule { }