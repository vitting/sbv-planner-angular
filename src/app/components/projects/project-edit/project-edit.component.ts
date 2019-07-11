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
import {
  DialogConfirmData,
  DialogConfirmComponent,
  DialogConfirmResult,
  DialogConfirmAction
} from '../../shared/dialog-confirm/dialog-confirm.component';
import { ProjectItemEditMenuComponent, ProjectEditMenuResult } from './project-item-edit-menu/project-item-edit-menu.component';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {
  projects$: Observable<Project[]>;
  constructor(
    private navbarService: NavbarService,
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
    const dialogCreateData: Dialog2FieldsData = {
      title: "Nyt Projekt",
      buttonText: "Tilføj",
      field1Label: "Titel",
      field1Value: null,
      field2Label: "Beskrivelse",
      field2Value: null
    };

    const dialogCreateRef = this.dialog.open(Dialog2FieldsComponent, {
      maxWidth: '350',
      autoFocus: false,
      data: dialogCreateData
    });

    dialogCreateRef.afterClosed().subscribe(async (result: Dialog2FieldsResult) => {
      if (result) {
        const projectId = await this.firestoreService.addProject(this.authService.userId, result.field1Value, result.field2Value);
        if (projectId) {
          this.showConfirmDialog(projectId);
        }
      }
    });
  }

  showConfirmDialog(projectId: string) {
    const dialogConfirmData: DialogConfirmData = {
      header: "Tilføj opgaver",
      button1Text: "Ja",
      button2Text: "Senere",
      message1: "Vil du tilføje opgaver til projektet nu?",
      message2: "Du kan gøre det senere."
    };

    const dialogConfirmRef = this.dialog.open(DialogConfirmComponent, {
      maxWidth: '350',
      autoFocus: false,
      data: dialogConfirmData
    });

    dialogConfirmRef.afterClosed().subscribe((result: DialogConfirmResult) => {
      if (result.action === DialogConfirmAction.yes) {
        this.router.navigate(["/projects", projectId, "tasks", "edit"]);
      }
    });
  }

  itemMenu(item: Project) {
    const bottomSheetRef = this.bottomSheet.open(ProjectItemEditMenuComponent);

    bottomSheetRef.afterDismissed().subscribe((result) => {
      if (result) {
        switch (result.action) {
          case ProjectEditMenuResult.edit:
            this.editProject(item);
            break;
          case ProjectEditMenuResult.editTasks:
              this.editProjectTasks(item);
              break;
          case ProjectEditMenuResult.delete:
            this.deleteProject(item);
            break;
          default:
            console.log("OTHER");
        }
      }
    });
  }

  editProject(item: Project) {
    const dialogEditData: Dialog2FieldsData = {
      title: "Rediger Projekt",
      buttonText: "Gem",
      field1Label: "Titel",
      field1Value: item.title,
      field2Label: "Beskrivelse",
      field2Value: item.description
    };

    const dialogEditRef = this.dialog.open(Dialog2FieldsComponent, {
      maxWidth: '350',
      autoFocus: false,
      data: dialogEditData
    });

    dialogEditRef.afterClosed().subscribe(async (result: Dialog2FieldsResult) => {
      if (result) {
        const projectId = await this.firestoreService.editProject(this.authService.userId, item.id, result.field1Value, result.field2Value);
      }
    });
  }

  editProjectTasks(item: Project) {
    this.router.navigate(["/projects", item.id, "tasks", "edit"]);
  }

  deleteProject(item: Project) {
    const dialogConfirmData: DialogConfirmData = {
      header: "Slet projekt",
      button1Text: "Ja",
      button2Text: "Nej",
      message1: "Vil du projektet?",
      message2: item.title
    };

    const dialogConfirmRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px',
      autoFocus: false,
      data: dialogConfirmData
    });

    dialogConfirmRef.afterClosed().subscribe(async (result: DialogConfirmResult) => {
      if (result && result.action === DialogConfirmAction.yes) {
        await this.firestoreService.deleteProject(item.id);
      }
    });
  }
}
