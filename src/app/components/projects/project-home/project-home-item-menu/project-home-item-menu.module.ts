import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectHomeItemMenuComponent } from './project-home-item-menu.component';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [ProjectHomeItemMenuComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatDividerModule,
    MatBottomSheetModule,
    FontAwesomeModule
  ],
  exports: [ProjectHomeItemMenuComponent],
  entryComponents: [ProjectHomeItemMenuComponent]
})
export class ProjectHomeItemMenuModule { }
