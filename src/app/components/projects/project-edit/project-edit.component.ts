import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {
  @ViewChild('taskItemInput', {static: true}) taskItemInput: ElementRef;
  projectForm: FormGroup;
  buttonTitle: string;
  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith'
  ];
  constructor(
    private navbarService: NavbarService,
    private route: ActivatedRoute,
    private firestoreService: FirestoreService,
    private router: Router
    ) { }

  ngOnInit() {
    if (this.route.snapshot.params.hasOwnProperty("id")) {
      this.navbarService.navbarTitle.next("Rediger Projekt");
      this.buttonTitle = "Gem";
    } else {
      this.navbarService.navbarTitle.next("Opret Projekt");
      this.buttonTitle = "Opret";
    }

    this.projectForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required])
    });
  }

  async onSubmit() {
    if (this.projectForm.valid) {
      const title = this.projectForm.get("title").value;
      const description = this.projectForm.get("description").value;
      const projectId = await this.firestoreService.addProject(title, description);

      if (projectId) {
        this.projectForm.reset();
        this.router.navigate(["/projects", projectId, "tasks", "edit"]);
      }
      console.log(projectId);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

  addTask() {
    if (this.taskItemInput.nativeElement.value.trim()) {
      this.movies.push(this.taskItemInput.nativeElement.value);
      this.taskItemInput.nativeElement.value = "";
    }
  }
}
