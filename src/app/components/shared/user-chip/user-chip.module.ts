import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserChipComponent } from './user-chip.component';



@NgModule({
  declarations: [UserChipComponent],
  imports: [
    CommonModule
  ],
  exports: [UserChipComponent]
})
export class UserChipModule { }
