import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ProjectMenuComponent } from './project-menu/project-menu.component';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<Project[]>;
  constructor(private navbarService: NavbarService, private firestoreService: FirestoreService, private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.navbarService.navbarTitle.next("Projekter");
    this.projects$ = this.firestoreService.getProjects();
  }

  projectItemMenuClick(project: Project) {
    console.log(project);

  }

  commentsTotalClick(project: Project) {
    console.log(project);
  }

  onAdd() {

  }
}
