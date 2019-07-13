import { Component, OnInit, AfterContentInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Project, ProjectItem } from './models/project.model';
import { Observable } from 'rxjs';
import { UtilitiesService } from './services/utilities.service';
import { AuthService } from './services/auth.service';
import { SplashService } from './services/splash.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private projectsCollection: AngularFirestoreCollection<Project>;
  projects: Observable<Project[]>;
  sidebarState = "close";
  showSplash = true;
  constructor(
    private db: AngularFirestore,
    private util: UtilitiesService,
    private authService: AuthService,
    private splashService: SplashService) {}

  ngOnInit(): void {
    this.splashService.splashShow.subscribe((showSplash) => {
      this.showSplash = showSplash;
    });

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
