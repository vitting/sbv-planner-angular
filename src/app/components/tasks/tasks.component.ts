import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  projectId: string;
  tasks$: Observable<Task[]>;
  tasksTotal = 8;
  tasksCompleted = 4;
  comments = 23;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navbarService: NavbarService,
    private firebaseService: FirestoreService) { }

  ngOnInit() {
    this.navbarService.setNavbarTitle("Opgaver");
    this.projectId = this.route.snapshot.params.projectId;
    if (this.projectId) {
      this.tasks$ = this.firebaseService.getTasks(this.projectId);
    }
    console.log(this.projectId);

  }

  checkboxClicked(status: boolean) {
    console.log(status);

  }

  goToComments(task: Task) {
    // this.router.navigate();
  }
}
