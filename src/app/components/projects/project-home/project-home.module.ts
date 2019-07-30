import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectHomeComponent } from './project-home.component';
import { ProjectHomeRoutingModule } from './project-home-routing.module';
import { MatListModule } from '@angular/material/list';
import { ProjectListItemModule } from '../project-list-item/project-list-item.module';
import { FabButtonModule } from '../../shared/fab-button/fab-button.module';
import { NoDataBoxModule } from '../../shared/no-data-box/no-data-box.module';
import { YearCalendarModule } from '../../year-calendar/year-calendar.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProjectHomeItemMenuComponent } from './project-home-item-menu/project-home-item-menu.component';
import { ProjectHomeMenuComponent } from './project-home-menu/project-home-menu.component';
@NgModule({
  declarations: [ProjectHomeComponent, ProjectHomeItemMenuComponent, ProjectHomeMenuComponent],
  imports: [
    CommonModule,
    ProjectHomeRoutingModule,
    MatListModule,
    ProjectListItemModule,
    FabButtonModule,
    FontAwesomeModule,
    NoDataBoxModule,
    YearCalendarModule
  ],
  providers: [],
  entryComponents: [ProjectHomeItemMenuComponent, ProjectHomeMenuComponent],
  exports: [
    ProjectHomeComponent,
  ]
})
export class ProjectHomeModule { }
