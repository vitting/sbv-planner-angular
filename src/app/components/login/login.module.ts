import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ItemContainerModule } from '../shared/directives/item-container/item-container.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MessagesErrorModule } from '../shared/messages-error/messages-error.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    FontAwesomeModule,
    MessagesErrorModule,
    ItemContainerModule
  ],
  exports: [
    LoginRoutingModule,
    LoginComponent
  ]
})
export class LoginModule { }
