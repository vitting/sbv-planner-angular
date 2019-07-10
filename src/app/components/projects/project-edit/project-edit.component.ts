import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Dialog2FieldsData, Dialog2FieldsComponent, Dialog2FieldsResult } from '../../shared/dialog-2-fields/dialog-2-fields.component';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/project.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {
  projects$: Observable<Project[]>;
  constructor(
    private navbarService: NavbarService,
    private route: ActivatedRoute,
    private firestoreService: FirestoreService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet
    ) { }

  ngOnInit() {
    this.navbarService.navbarTitle.next("Rediger Projekter");

    this.projects$ = this.firestoreService.getProjects();
  }

  addProject() {
    const data: Dialog2FieldsData = {
      title: "Nyt Projekt",
      buttonText: "Tilføj",
      field1Label: "Titel",
      field1Value: null,
      field2Label: "Beskrivelse",
      field2Value: null
    };

    const dialogRef = this.dialog.open(Dialog2FieldsComponent, {
      maxWidth: '350',
      autoFocus: false,
      data
    });

    dialogRef.afterClosed().subscribe(async (result: Dialog2FieldsResult) => {
      if (result) {
        await this.firestoreService.addProject(this.authService.userId, result.field1Value, result.field2Value);
      }
    });
  }
}
