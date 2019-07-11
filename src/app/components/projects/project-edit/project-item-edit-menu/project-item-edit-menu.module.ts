import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectItemEditMenuComponent } from './project-item-edit-menu.component';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';



@NgModule({
  declarations: [ProjectItemEditMenuComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatDividerModule
  ],
  exports: [ProjectItemEditMenuComponent],
  entryComponents: [ProjectItemEditMenuComponent]
})
export class ProjectItemEditMenuModule { }
