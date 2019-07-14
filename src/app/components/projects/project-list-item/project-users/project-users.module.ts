import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectUsersComponent } from './project-users.component';
import { UserChipModule } from 'src/app/components/shared/user-chip/user-chip.module';



@NgModule({
  declarations: [ProjectUsersComponent],
  imports: [
    CommonModule,
    UserChipModule
  ],
  exports: [ProjectUsersComponent]
})
export class ProjectUsersModule { }
