import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemContainerDirective } from './item-container.directive';



@NgModule({
  declarations: [ItemContainerDirective],
  imports: [
    CommonModule
  ],
  exports: [ItemContainerDirective]
})
export class ItemContainerModule { }
