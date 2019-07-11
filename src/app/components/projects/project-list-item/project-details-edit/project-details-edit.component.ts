import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { User } from 'src/app/models/user.model';
import { FirestoreService } from 'src/app/services/firestore.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-project-details-edit',
  templateUrl: './project-details-edit.component.html',
  styleUrls: ['./project-details-edit.component.scss']
})
export class ProjectDetailsEditComponent implements OnInit {
  @Input() project: Project;
  user: User;
  constructor(private firestoreService: FirestoreService) { }

  ngOnInit() {
    this.firestoreService.getUser(this.project.createdBy).pipe(take(1)).subscribe((user) => {
      this.user = user;
    });
  }

}
