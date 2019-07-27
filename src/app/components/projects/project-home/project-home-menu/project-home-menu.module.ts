import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectHomeMenuComponent } from './project-home-menu.component';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [ProjectHomeMenuComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatListModule,
    MatDividerModule,
    MatBottomSheetModule
  ],
  exports: [ProjectHomeMenuComponent],
  entryComponents: [ProjectHomeMenuComponent]
})
export class ProjectHomeMenuModule { }
