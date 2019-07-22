import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { ItemContainerModule } from '../shared/directives/item-container/item-container.module';
import { DialogConfirmModule } from '../shared/dialog-confirm/dialog-confirm.module';
import { UserAcceptItemComponent } from './user-accept-item/user-accept-item.component';
import { UserAcceptListComponent } from './user-accept-list/user-accept-list.component';
import { NoDataBoxModule } from '../shared/no-data-box/no-data-box.module';


@NgModule({
  declarations: [UsersComponent, UserAcceptItemComponent, UserAcceptListComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    ItemContainerModule,
    DialogConfirmModule,
    NoDataBoxModule
  ],
  exports: [UsersComponent]
})
export class UsersModule { }
