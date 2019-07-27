import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatChipsModule} from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProjectsComponent } from './projects.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { FabButtonModule } from '../shared/fab-button/fab-button.module';
import { ProjectMenuComponent } from './project-menu/project-menu.component';
import { RouterModule } from '@angular/router';
import { ProjectListItemModule } from './project-list-item/project-list-item.module';
import { DialogConfirmModule } from '../shared/dialog-confirm/dialog-confirm.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [ProjectsComponent, ProjectMenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatBottomSheetModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatChipsModule,
    MatIconModule,
    MatDialogModule,
    FontAwesomeModule,
    ProjectsRoutingModule,
    FabButtonModule,
    ProjectListItemModule,
    DialogConfirmModule
  ],
  exports: [ProjectsComponent],
  entryComponents: [ProjectMenuComponent]
})
export class ProjectsModule { }
