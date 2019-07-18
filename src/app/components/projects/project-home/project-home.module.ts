import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectHomeComponent } from './project-home.component';
import { ProjectHomeRoutingModule } from './project-home-routing.module';
import { MatListModule } from '@angular/material/list';
import { ProjectListItemModule } from '../project-list-item/project-list-item.module';
import { FabButtonModule } from '../../shared/fab-button/fab-button.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ProjectHomeItemMenuModule } from './project-home-item-menu/project-home-item-menu.module';
import { FabMenuButtonModule } from '../../shared/fab-menu-button/fab-menu-button.module';
@NgModule({
  declarations: [ProjectHomeComponent],
  imports: [
    CommonModule,
    ProjectHomeRoutingModule,
    MatListModule,
    ProjectListItemModule,
    FabButtonModule,
    ProjectHomeItemMenuModule,
    FabMenuButtonModule
  ],
  providers: [],
  exports: [
    ProjectHomeComponent,
  ]
})
export class ProjectHomeModule { }
