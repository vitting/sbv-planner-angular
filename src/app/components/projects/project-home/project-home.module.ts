import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectHomeComponent } from './project-home.component';
import { ProjectHomeRoutingModule } from './project-home-routing.module';
import { MatListModule } from '@angular/material/list';
import { ProjectListItemModule } from '../project-list-item/project-list-item.module';
import { FabButtonModule } from '../../shared/fab-button/fab-button.module';
import { ProjectHomeItemMenuModule } from './project-home-item-menu/project-home-item-menu.module';
import { NoDataBoxModule } from '../../shared/no-data-box/no-data-box.module';
import { ProjectHomeMenuModule } from './project-home-menu/project-home-menu.module';
import { MatDialogModule } from '@angular/material/dialog';
import { YearCalendarModule } from '../../year-calendar/year-calendar.module';
@NgModule({
  declarations: [ProjectHomeComponent],
  imports: [
    CommonModule,
    ProjectHomeRoutingModule,
    MatListModule,
    MatDialogModule,
    ProjectListItemModule,
    FabButtonModule,
    ProjectHomeItemMenuModule,
    ProjectHomeMenuModule,
    NoDataBoxModule,
    YearCalendarModule
  ],
  providers: [],
  exports: [
    ProjectHomeComponent,
  ]
})
export class ProjectHomeModule { }
