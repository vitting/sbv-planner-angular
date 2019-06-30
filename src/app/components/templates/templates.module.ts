import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplatesRoutingModule } from './templates-routing.module';
import { TemplatesComponent } from './templates.component';

@NgModule({
  declarations: [TemplatesComponent],
  imports: [
    CommonModule,
    TemplatesRoutingModule
  ],
  exports: [TemplatesComponent]
})
export class TemplatesModule { }
