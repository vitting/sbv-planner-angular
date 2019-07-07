import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubtaskListItemComponent } from './subtask-list-item.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTasks } from '@fortawesome/free-solid-svg-icons';


@NgModule({
  declarations: [SubtaskListItemComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FontAwesomeModule
  ],
  exports: [SubtaskListItemComponent]
})
export class SubtaskListItemModule {
  constructor() {
    library.add(faTasks);
  }
}
