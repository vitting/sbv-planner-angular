import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubtaskListItemComponent } from './subtask-list-item.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CheckboxModule } from 'src/app/components/shared/checkbox/checkbox.module';
import { UserChipModule } from 'src/app/components/shared/user-chip/user-chip.module';
import { UsersListModule } from 'src/app/components/shared/users-list/users-list.module';

@NgModule({
  declarations: [SubtaskListItemComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    CheckboxModule,
    UserChipModule,
    UsersListModule
  ],
  exports: [SubtaskListItemComponent]
})
export class SubtaskListItemModule {
  constructor() {}
}
