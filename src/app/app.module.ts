import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faTimesCircle,
  faTasks,
  faUser,
  faUsers,
  faEdit,
  faHome,
  faSignInAlt,
  faSignOutAlt,
  faArrowLeft,
  faCircle,
  faExclamationCircle,
  faChevronCircleRight,
  faCog,
  faDirections,
  faCalendarDay
} from '@fortawesome/free-solid-svg-icons';
import {
  faComment,
  faCalendar,
  faTrashAlt,
  faLightbulb,
  faClipboard,
  faCheckSquare,
  faSquare,
  faQuestionCircle,
  faCalendarAlt,
  faCalendarPlus,
  faFileAlt
} from '@fortawesome/free-regular-svg-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { firebaseConfig } from 'src/environments/firebase-config';
import { ProjectsModule } from './components/projects/projects.module';
import { LoginModule } from './components/login/login.module';
import { ProjectHomeModule } from './components/projects/project-home/project-home.module';
import { TasksModule } from './components/tasks/tasks.module';
import { TemplatesModule } from './components/templates/templates.module';
import { SignupModule } from './components/signup/signup.module';
import { NavbarModule } from './components/navbar/navbar.module';
import { SettingsModule } from './components/settings/settings.module';
import { ProjectEditModule } from './components/projects/project-edit/project-edit.module';
import { TasksEditModule } from './components/tasks/tasks-edit/tasks-edit.module';
import { CommentsModule } from './components/comments/comments.module';
import 'moment/locale/da';
import { SplashScreenModule } from './components/shared/splash-screen/splash-screen.module';
import { UsersModule } from './components/users/users.module';
import { YearCalendarModule } from './components/year-calendar/year-calendar.module';
import { Dialog2FieldsModule } from './components/shared/dialog-2-fields/dialog-2-fields.module';
import { Dialog1FieldModule } from './components/shared/dialog-1-field/dialog-1-fieldmodule';
import { DialogConfirmModule } from './components/shared/dialog-confirm/dialog-confirm.module';
import { LogsModule } from './components/logs/logs.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig.firebase, 'sbv-planner'),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ProjectHomeModule,
    ProjectsModule,
    LoginModule,
    TasksModule,
    TemplatesModule,
    SignupModule,
    NavbarModule,
    SettingsModule,
    ProjectEditModule,
    TasksEditModule,
    CommentsModule,
    SplashScreenModule,
    UsersModule,
    YearCalendarModule,
    Dialog2FieldsModule,
    Dialog1FieldModule,
    DialogConfirmModule,
    LogsModule,
    AppRoutingModule // AppRoutingModule = Keep this routing module last to make wildcard work correct
  ],
  providers: [AngularFireAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(
      faTimesCircle,
      faComment,
      faCog,
      faTasks,
      faCalendar,
      faCalendarDay,
      faUser,
      faLightbulb,
      faSignInAlt,
      faCalendarAlt,
      faCalendarPlus,
      faEdit,
      faCheckSquare,
      faSquare,
      faClipboard,
      faHome,
      faTrashAlt,
      faUsers,
      faArrowLeft,
      faCircle,
      faQuestionCircle,
      faChevronCircleRight,
      faExclamationCircle,
      faFileAlt,
      faDirections,
      faFileAlt,
      faSignOutAlt);
  }
}
