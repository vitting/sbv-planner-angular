import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { SidebarModule } from './components/sidebar/sidebar.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { firebaseConfig } from 'src/environments/firebase-config';
import { ProjectsModule } from './components/projects/projects.module';
import { LoginModule } from './components/login/login.module';
import { HomeModule } from './components/home/home.module';
import { TasksModule } from './components/tasks/tasks.module';
import { TemplatesModule } from './components/templates/templates.module';
import { SignupModule } from './components/signup/signup.module';
import { NavbarModule } from './components/navbar/navbar.module';
import { SettingsModule } from './components/settings/settings.module';
import { ProjectEditModule } from './components/projects/project-edit/project-edit.module';
import { TasksEditModule } from './components/tasks/tasks-edit/tasks-edit.module';
import { ItemContainerDirective } from './components/shared/directives/item-container/item-container.directive';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig.firebase, 'sbv-planner'),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    HomeModule,
    ProjectsModule,
    LoginModule,
    TasksModule,
    TemplatesModule,
    SignupModule,
    SidebarModule,
    NavbarModule,
    SettingsModule,
    ProjectEditModule,
    TasksEditModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
