import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SignupMessageComponent } from './signup-message/signup-message.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ItemContainerModule } from '../shared/directives/item-container/item-container.module';
import { MessagesErrorModule } from '../shared/messages-error/messages-error.module';

@NgModule({
  declarations: [SignupComponent, SignupMessageComponent],
  imports: [
    CommonModule,
    SignupRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    FontAwesomeModule,
    MatIconModule,
    MessagesErrorModule,
    ItemContainerModule
  ],
  exports: [SignupComponent, SignupMessageComponent]
})
export class SignupModule { }
