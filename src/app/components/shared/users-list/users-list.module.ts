import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserChipComponent } from './user-chip/user-chip.component';

@NgModule({
  declarations: [UsersListComponent, UserChipComponent],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [UsersListComponent]
})
export class UsersListModule { }
