import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplatesRoutingModule } from './templates-routing.module';
import { TemplatesComponent } from './templates.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import { ItemTitleDescModule } from '../shared/item-title-desc/item-title-desc.module';
import { TemplateItemComponent } from './template-item/template-item.component';
import { ItemContainerModule } from '../shared/directives/item-container/item-container.module';
import { TemplateTaskItemComponent } from './template-task-item/template-task-item.component';
import { TemplateSubtaskItemComponent } from './template-subtask-item/template-subtask-item.component';
import { FabButtonModule } from '../shared/fab-button/fab-button.module';

@NgModule({
  declarations: [TemplatesComponent, TemplateItemComponent, TemplateTaskItemComponent, TemplateSubtaskItemComponent],
  imports: [
    CommonModule,
    TemplatesRoutingModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    ItemTitleDescModule,
    ItemContainerModule,
    FabButtonModule
  ],
  exports: [TemplatesComponent]
})
export class TemplatesModule { }
