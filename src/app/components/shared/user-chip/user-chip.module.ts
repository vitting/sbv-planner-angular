import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserChipComponent } from './user-chip.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [UserChipComponent],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [UserChipComponent]
})
export class UserChipModule { }
