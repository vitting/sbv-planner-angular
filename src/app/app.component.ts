import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Project, ProjectItem } from './models/project.model';
import { Observable } from 'rxjs';
import { UtilitiesService } from './services/utilities.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private projectsCollection: AngularFirestoreCollection<Project>;
  projects: Observable<Project[]>;
  sidebarState = "close";
  constructor(private db: AngularFirestore, private util: UtilitiesService) {}

  ngOnInit(): void {

    this.projectsCollection = this.db.collection<Project>('projects');

    this.projects = this.projectsCollection.valueChanges();
  }

  onAddItem() {
    const id = this.db.createId();
    // const project2 = new ProjectItem(id, "test2", "noget", this.util.timestamp , "121212", true, []);

    // this.projectsCollection.doc(id).set(project2.toObject());
  }

  onChange(value: string) {
    this.sidebarState = value;
  }
}
