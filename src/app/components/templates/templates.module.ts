import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplatesRoutingModule } from './templates-routing.module';
import { TemplatesComponent } from './templates.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ItemTitleDescModule } from '../shared/item-title-desc/item-title-desc.module';
import { TemplateItemComponent } from './template-item/template-item.component';
import { TemplateTaskItemComponent } from './template-task-item/template-task-item.component';
import { TemplateSubtaskItemComponent } from './template-subtask-item/template-subtask-item.component';
import { FabButtonModule } from '../shared/fab-button/fab-button.module';
import { ItemContainerModule } from '../shared/directives/item-container/item-container.module';

@NgModule({
  declarations: [
    TemplatesComponent,
    TemplateItemComponent,
    TemplateTaskItemComponent,
    TemplateSubtaskItemComponent],
  imports: [
    CommonModule,
    TemplatesRoutingModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    ItemContainerModule,
    ItemTitleDescModule,
    FabButtonModule
  ],
  exports: [TemplatesComponent]
})
export class TemplatesModule { }
