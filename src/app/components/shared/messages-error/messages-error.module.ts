import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesErrorComponent } from './messages-error.component';
import { MatListModule } from '@angular/material/list';
import { ItemContainerModule } from '../directives/item-container/item-container.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [MessagesErrorComponent],
  imports: [
    CommonModule,
    MatListModule,
    FontAwesomeModule,
    ItemContainerModule
  ],
  exports: [MessagesErrorComponent]
})
export class MessagesErrorModule { }
