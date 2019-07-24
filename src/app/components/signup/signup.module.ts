import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SignupMessageComponent } from './signup-message/signup-message.component';
import { MatIconModule } from '@angular/material/icon';
import { MessagesModule } from '../shared/messages/messages.module';

@NgModule({
  declarations: [SignupComponent, SignupMessageComponent],
  imports: [
    CommonModule,
    SignupRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MessagesModule
  ],
  exports: [SignupComponent]
})
export class SignupModule { }
