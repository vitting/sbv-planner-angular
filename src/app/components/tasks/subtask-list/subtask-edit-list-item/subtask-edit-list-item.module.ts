import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubtaskEditListItemComponent } from './subtask-edit-list-item.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [SubtaskEditListItemComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [SubtaskEditListItemComponent]
})
export class SubtaskEditListItemModule {
  constructor() {}
}
