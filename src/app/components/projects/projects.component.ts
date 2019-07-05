import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ProjectMenuComponent } from './project-menu/project-menu.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  selectable = false;
  constructor(private navbarService: NavbarService, private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.navbarService.navbarTitle.next("Mine Projekter");
  }

  onAdd() {
    this.bottomSheet.open(ProjectMenuComponent);
  }

  test() {
    console.log("TEST");

  }
}
