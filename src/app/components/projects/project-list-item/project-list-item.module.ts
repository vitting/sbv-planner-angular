import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProjectListItemComponent } from './project-list-item.component';



@NgModule({
  declarations: [ProjectListItemComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [ProjectListItemComponent]
})
export class ProjectListItemModule { }
