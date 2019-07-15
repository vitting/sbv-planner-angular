import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list.component';
import { UserChipModule } from 'src/app/components/shared/user-chip/user-chip.module';



@NgModule({
  declarations: [UsersListComponent],
  imports: [
    CommonModule,
    UserChipModule
  ],
  exports: [UsersListComponent]
})
export class UsersListModule { }
