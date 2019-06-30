import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { firebaseConfig } from 'src/environments/firebase-config';
import { AngularFireModule } from '@angular/fire';
import { ProjectsModule } from './components/projects/projects.module';
import { LoginModule } from './components/login/login.module';
import { HomeModule } from './components/home/home.module';
import { TasksModule } from './components/tasks/tasks.module';
import { TemplatesModule } from './components/templates/templates.module';
import { SignupModule } from './components/signup/signup.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig.firebase, 'sbv-planner'),
    HomeModule,
    ProjectsModule,
    LoginModule,
    TasksModule,
    TemplatesModule,
    SignupModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
