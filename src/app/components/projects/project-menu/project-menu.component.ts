import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-menu',
  templateUrl: './project-menu.component.html',
  styleUrls: ['./project-menu.component.scss']
})
export class ProjectMenuComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<ProjectMenuComponent>, private router: Router) { }

  ngOnInit() {
  }

  onGotoRoute(event: MouseEvent, path: string) {
    this.router.navigate([path]);
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
