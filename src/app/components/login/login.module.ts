import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessagesModule } from '../shared/messages/messages.module';
import { ItemContainerModule } from '../shared/directives/item-container/item-container.module';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    FontAwesomeModule,
    MessagesModule,
    ItemContainerModule
  ],
  exports: [
    LoginRoutingModule,
    LoginComponent
  ]
})
export class LoginModule { }
