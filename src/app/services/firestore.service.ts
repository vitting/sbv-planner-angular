import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { ProjectItem, Project } from '../models/project.model';
import { TaskItem, Task } from '../models/task.model';
import { take, map } from 'rxjs/operators';
import { SubTaskItem, SubTask } from '../models/subtask.model';
import { User, UserItem } from '../models/user.model';
import { Observable } from 'rxjs';
import { Comment, CommentItem } from '../models/comment.model';
import { Summary } from '../models/summary.model';
import { TemplateItem, Template, TemplateTask, TemplateSubTask } from '../models/template.model';
import { CalendarItem } from '../models/calendar.model';
import { UserMeta } from '../models/user-meta.model';
import { AppMeta } from '../models/app-meta.model';
import { Log } from '../models/log.model';
import { Settings } from '../models/settings.model';

export enum SummaryAction {
  add,
  delete
}

export interface ProjectTaskName {
  projectName: string;
  taskName: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private db: AngularFirestore) { }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  get newId(): string {
    return this.db.createId();
  }

  async addToLog(message: string, userId: string = "", type: string = "") {
    try {
      await this.db.collection<Log>("logs").add({
        type,
        date: this.timestamp,
        message,
        userId
      });
      return true;
    } catch (error) {
      console.error("addToLog", error);
      return false;
    }
  }

  getAppMeta() {
    return this.db.collection<AppMeta>("appmetas").doc<AppMeta>("app-meta").valueChanges();
  }

  getUserMeta(userId: string) {
    return this.db.collection<UserMeta>("usermetas").doc<UserMeta>(userId).valueChanges();
  }

  async updateUserMetaComments(userId: string, parentId: string) {
    try {
      const data = {};

      data[parentId] = {
        commentsLastRead: this.timestamp
      };

      await this.db.collection<UserMeta>("usermetas").doc<UserMeta>(userId).set(data, {
        merge: true
      });
      return true;
    } catch (error) {
      console.warn("updateUserMetaComments", error);
      return false;
    }
  }

  async updateUserMetaLastCheckToAcceptUsers(userId: string) {
    try {
      const data = {};

      data["accept-visit"] = {
        usersApprovedLastChecked: this.timestamp
      };

      await this.db.collection<UserMeta>("usermetas").doc<UserMeta>(userId).set(data, {
        merge: true
      });
      return true;
    } catch (error) {
      console.warn("updateUserMetaLastCheckToAcceptUsers", error);
      return false;
    }
  }

  async createProjectFromTemplate(userId: string, template: Template) {
    try {
      const projectId = await this.addProject(userId, template.title, template.description);
      const templateTasks = await this.getTemplateTasks(template.id).pipe(take(1)).toPromise();
      templateTasks.forEach(async (templateTask, index) => {
        const taskId = await this.addTask(userId, templateTask.title, templateTask.description, projectId, index);
        const templateSubTasks = await this.getTemplateSubTasks(templateTask.id).pipe(take(1)).toPromise();

        templateSubTasks.forEach(async (templateSubTask) => {
          await this.addSubTask(userId, templateSubTask.title, projectId, taskId);
        });
      });
      return projectId;
    } catch (error) {
      console.warn("createProjectFromTemplate", error);
      return null;
    }
  }

  getTemplate(templateId: string) {
    return this.db.collection<Template>("templates").doc<Template>(templateId).valueChanges();
  }

  getTemplates() {
    return this.db.collection<Template>("templates", (ref) => {
      return ref.where("active", "==", true).orderBy("updatedAt");
    }).valueChanges();
  }

  getTemplateTasks(templateId: string) {
    return this.db.collection<TemplateTask>("templatetasks", (ref) => {
      return ref.where("templateId", "==", templateId).where("active", "==", true).orderBy("title");
    }).valueChanges();
  }

  getTemplateSubTasks(templateTaskId: string) {
    return this.db.collection<TemplateSubTask>("templatesubtasks", (ref) => {
      return ref.where("templateTaskId", "==", templateTaskId).where("active", "==", true).orderBy("title");
    }).valueChanges();
  }

  async addTemplate(user: User, title: string, description: string) {
    const id = this.newId;
    const timestamp = this.timestamp;
    const template = new TemplateItem(id, title, description, timestamp, timestamp, user.id, user.id);
    try {
      await this.db.collection<Template>("templates").doc(id).set(template.toObject());
      return id;
    } catch (error) {
      console.error("AddTemplate", error);
      return null;
    }
  }

  async updateTemplate(user: User, templateId: string, title: string, description: string) {
    const timestamp = this.timestamp;
    try {
      await this.db.collection<Template>("templates").doc(templateId).update({
        title,
        description,
        updatedAt: timestamp,
        updatedBy: user.id
      });
      return templateId;
    } catch (error) {
      console.error("updatedTemplate");
      return null;
    }
  }

  async deleteTemplate(templateId: string) {
    try {
      const templateTasks = await this.getTemplateTasks(templateId).pipe(take(1)).toPromise();
      templateTasks.forEach(async (templateTask) => {
        await this.deleteTemplateTask(templateTask.id);
      });

      await this.db.collection<Template>("templates").doc(templateId).update({
        active: false
      });
      return templateId;
    } catch (error) {
      console.warn("deleteTemplate", error);

      return null;
    }
  }

  async addTemplateTask(templateId: string, title: string, description: string) {
    const id = this.newId;
    const templateTask: TemplateTask = {
      id,
      title,
      description,
      templateId,
      active: true
    };

    try {
      this.db.collection<TemplateTask>("templatetasks").doc(id).set(templateTask);
      return id;
    } catch (error) {
      console.warn("addTemplateTask");
      return null;
    }
  }

  async updateTemplateTask(templateTaskId: string, title: string, description: string) {
    try {
      this.db.collection<TemplateTask>("templatetasks").doc<TemplateTask>(templateTaskId).update({
        title,
        description
      });
      return templateTaskId;
    } catch (error) {
      console.warn("updateTemplateTask");
      return null;
    }
  }

  async deleteTemplateTask(templateTaskId: string) {
    try {
      const templateSubTasks = await this.getTemplateSubTasks(templateTaskId).pipe(take(1)).toPromise();
      if (templateSubTasks && templateSubTasks.length !== 0) {
        const batch = this.db.firestore.batch();
        templateSubTasks.forEach((templateSubTask) => {
          const templateSubTaskRef = this.db.collection("templatesubtasks").doc(templateSubTask.id).ref;
          batch.update(templateSubTaskRef, {
            active: false
          });
        });

        await batch.commit();
      }

      await this.db.collection<TemplateTask>("templatetasks").doc(templateTaskId).update({
        active: false
      });
      return templateTaskId;
    } catch (error) {
      console.warn("deleteTemplateTask");
      return null;
    }
  }

  async addTemplateSubTask(templateTask: TemplateTask, title: string) {
    const id = this.newId;
    const templateSubTask: TemplateSubTask = {
      id,
      title,
      templateId: templateTask.templateId,
      templateTaskId: templateTask.id,
      active: true
    };

    try {
      this.db.collection<TemplateSubTask>("templatesubtasks").doc(id).set(templateSubTask);
      return id;
    } catch (error) {
      console.warn("addTemplateSubTask");
      return null;
    }
  }

  async updateTemplateSubTask(templateSubTaskId: string, title: string) {
    try {
      this.db.collection<TemplateSubTask>("templatesubtasks").doc<TemplateSubTask>(templateSubTaskId).update({
        title
      });
      return templateSubTaskId;
    } catch (error) {
      console.warn("updateTemplateSubTask");
      return null;
    }
  }

  async deleteTemplateSubTask(templateSubTaskId: string) {
    try {
      await this.db.collection<TemplateSubTask>("templatesubtasks").doc(templateSubTaskId).update({
        active: false
      });
      return templateSubTaskId;
    } catch (error) {
      console.warn("deleteTemplateSubTask");
      return null;
    }
  }

  async addCalendarItem(user: User, text: string, month: number): Promise<string> {
    const id = this.newId;
    const timestamp = this.timestamp;
    const entry: CalendarItem = {
      id,
      month,
      text,
      createdAt: timestamp,
      createdBy: user.id,
      active: true
    };

    try {
      await this.db.collection<CalendarItem>("calendaritems").doc(id).set(entry);
      return id;
    } catch (error) {
      console.error("addCalendarItem", error);
      return null;
    }
  }

  async updateCalendarItem(itemId: string, text: string): Promise<string> {
    try {
      await this.db.collection<CalendarItem>("calendaritems").doc<CalendarItem>(itemId).update(
        {
          text
        }
      );

      return itemId;
    } catch (error) {
      console.error("updateCalendarItem", error);
      return null;
    }
  }

  async deleteCalendarItem(itemId: string): Promise<string> {
    try {
      await this.db.collection<CalendarItem>("calendaritems").doc<CalendarItem>(itemId).delete();
      return Promise.resolve(itemId);
    } catch (error) {
      console.error("deleteCalendarItem", error);
      return Promise.reject(error);
    }
  }

  getCalendarItems(month: number): Observable<CalendarItem[]> {
    return this.db.collection<CalendarItem>("calendaritems", (ref) => {
      return ref.where("month", "==", month).where("active", "==", true).orderBy("text");
    }).valueChanges();
  }

  async addComment(user: User, text: string, type: string, itemId: string): Promise<string> {
    const id = this.newId;
    const timestamp = this.timestamp;
    const comment = new CommentItem(id, itemId, text, timestamp, timestamp, type, user.id);

    try {
      await this.db.collection<Comment>("comments").doc(id).set(comment.toObject());
      await this.updateUserMetaComments(user.id, itemId);
      return id;
    } catch (error) {
      console.error("AddComment", error);
      return null;
    }
  }

  async updateComment(commentId: string, newText: string): Promise<string> {
    const timestamp = this.timestamp;

    try {
      await this.db.collection<Comment>("comments").doc<Comment>(commentId).update(
        {
          text: newText,
          updatedAt: timestamp
        }
      );

      return commentId;
    } catch (error) {
      console.error("updateComment", error);
      return null;
    }
  }

  async deleteComment(commentId: string): Promise<string> {
    try {
      await this.db.collection<Comment>("comments").doc(commentId).delete();
      return Promise.resolve(commentId);
    } catch (error) {
      console.error("deleteComment", error);
      return Promise.reject(error);
    }
  }

  getComments(parentId: string): Observable<Comment[]> {
    return this.db.collection<Comment>("comments", (ref) => {
      return ref.where("parentId", "==", parentId).where("active", "==", true).orderBy("createdAt");
    }).valueChanges();
  }

  getSettings(userId: string) {
    return this.db.collection<Settings>("settings").doc<Settings>(userId).valueChanges();
  }

  async addSettings(userId: string): Promise<string> {
    const timestamp = this.timestamp;
    const settings: Settings = {
      id: userId,
      showCalendar: true
    };
    try {
      await this.db.collection<Settings>("settings").doc(userId).set(settings);
      return userId;
    } catch (error) {
      console.error("addSettings", error);
      return null;
    }
  }

  async updateSettingsShowCalendar(userId: string, showCalendar: boolean): Promise<string> {
    try {
      await this.db.collection<Settings>("settings").doc(userId).update({
        showCalendar
      });
      return userId;
    } catch (error) {
      console.error("updateSettingsShowCalendar", error);
      return null;
    }
  }

  async addUser(userId: string, name: string): Promise<User> {
    const timestamp = this.timestamp;
    const user: User = new UserItem(userId, name, timestamp).toObject();
    try {
      await this.db.collection<User>("users").doc(userId).set(user);
      return user;
    } catch (error) {
      console.error("addUser", error);
      return null;
    }
  }

  async updateNameOfUser(userId: string, name: string): Promise<string> {
    try {
      await this.db.collection<User>("users").doc(userId).update({
        name
      });
      return userId;
    } catch (error) {
      console.error("updateNameOfUser", error);
      return null;
    }
  }

  async updateUserAdmin(userId: string, state: boolean): Promise<string> {
    try {
      let data: any;
      if (state) {
        data = {
          admin: state,
          editor: true
        };
      } else {
        data = {
          admin: state
        };
      }
      await this.db.collection<User>("users").doc(userId).update(data);
      return userId;
    } catch (error) {
      console.error("updateUserAdmin", error);
      return null;
    }
  }

  async updateUserEditor(userId: string, state: boolean): Promise<string> {
    try {
      await this.db.collection<User>("users").doc(userId).update({
        editor: state
      });
      return userId;
    } catch (error) {
      console.error("updateUserEditor", error);
      return null;
    }
  }

  async updateUserActive(userId: string, state: boolean): Promise<string> {
    try {
      await this.db.collection<User>("users").doc(userId).update({
        active: state
      });
      return userId;
    } catch (error) {
      console.error("updateUserActive", error);
      return null;
    }
  }

  getUsersWaitingForApproval() {
    return this.db.collection<User>("users", (ref) => {
      return ref.where("waitingForApproval", "==", true).orderBy("name");
    }).valueChanges();
  }

  getUsersAccepted() {
    return this.db.collection<User>("users", (ref) => {
      return ref.where("approved", "==", true).orderBy("name");
    }).valueChanges();
  }

  getUsersRejected() {
    return this.db.collection<User>("users", (ref) => {
      return ref.where("approved", "==", null).orderBy("name");
    }).valueChanges();
  }

  async updateUserAccepted(userId: string, accepted: boolean): Promise<string | null> {
    try {
      await this.db.collection<User>("users").doc(userId).update({
        waitingForApproval: false,
        accepted
      });
      return userId;
    } catch (error) {
      console.error("updateUserAccepted", error);
      return null;
    }
  }

  async updateUsersAccepted(users: User[], accepted: boolean): Promise<string | null> {
    try {
      if (users && users.length) {
        const batch = this.db.firestore.batch();
        users.forEach((user) => {
          const userRef = this.db.collection<User>("users").doc(user.id).ref;
          batch.update(userRef, {
            waitingForApproval: false,
            accepted
          });
        });

        await batch.commit();
      }

      return "ok";
    } catch (error) {
      console.error("updateUsersAccepted", error);
      return null;
    }
  }

  async getProjectTaskName(projectId: string, taskId: string): Promise<ProjectTaskName> {
    const projectTaskName: ProjectTaskName = {
      projectName: null,
      taskName: null
    };

    const project: Project = await this.db.collection<Project>("projects").doc<Project>(projectId).valueChanges().pipe(take(1)).toPromise();
    projectTaskName.projectName = project.title;
    if (taskId) {
      const task: Task = await this.db.collection<Task>("tasks").doc<Task>(taskId).valueChanges().pipe(take(1)).toPromise();
      projectTaskName.taskName = task.title;
    }

    return projectTaskName;
  }

  getUser(userId: string): Observable<User> {
    return this.db.collection<User>("users").doc<User>(userId).valueChanges();
  }

  getUsers(): Observable<User[]> {
    return this.db.collection<User>("users").valueChanges();
  }

  getUsersSorted(acsending: boolean): Observable<User[]> {
    return this.db.collection<User>("users", (ref) => {
      return ref.orderBy("name", acsending ? "asc" : "desc");
    }).valueChanges();
  }

  getProjects() {
    return this.db.collection<Project>("projects", (ref) => {
      return ref.where("active", "==", true).orderBy("createdAt", "desc").orderBy("title");
    }).valueChanges();
  }

  getProjectsNotContainingUserId(userId: string) {
    return this.db.collection<Project>("projects", (ref) => {
      return ref.where("active", "==", true).orderBy("createdAt", "desc").orderBy("title");
    }).valueChanges().pipe(map((projects) => {
      const newProjects: Project[] = [];
      projects.forEach((project: Project) => {
        if (project.users.indexOf(userId) === -1) {
          newProjects.push(project);
        }
      });

      return newProjects;
    }));
  }

  getProjectsByUserId(userId: string) {
    return this.db.collection<Project>("projects", (ref) => {
      return ref.where("active", "==", true).where("users", "array-contains", userId).orderBy("createdAt", "desc").orderBy("title");
    }).valueChanges();
  }

  async addProject(userId: string, title: string, description: string): Promise<string> {
    const id = this.newId;
    const timestamp = this.timestamp;

    const projectItem = new ProjectItem(id, title, description, timestamp, timestamp, userId, [userId]);
    try {
      await this.db.collection<Project>("projects").doc(id).set(projectItem.toObject());
      await this.addSummary(id);
      return id;
    } catch (error) {
      console.error("addProject", error);
      return null;
    }
  }

  async updateProject(
    userId: string,
    projectId: string,
    newTitle: string,
    newDescription: string): Promise<string> {
    const timestamp = this.timestamp;

    try {
      await this.db.collection<Project>("projects").doc(projectId).update(
        {
          title: newTitle,
          description: newDescription,
          updatedAt: timestamp,
          updatedBy: userId
        }
      );

      return projectId;
    } catch (error) {
      console.error("updateProject", error);
      return null;
    }
  }

  async deleteProject(projectId: string) {
    const tasks$ = this.getTasks(projectId);
    tasks$.pipe(take(1)).subscribe((tasks: Task[]) => {
      if (tasks) {
        tasks.forEach((task) => {
          this.deleteTask(task.id);
        });
      }
    });

    await this.deleteSummary(projectId);
    return this.db.collection<Project>("projects").doc(projectId).delete();
  }

  async addPersonToProject(projectId: string, userId: string) {
    const timestamp = this.timestamp;

    try {
      await this.db.collection<Project>("projects").doc(projectId).update(
        {
          updatedAt: timestamp,
          updatedBy: userId,
          users: firebase.firestore.FieldValue.arrayUnion(userId)
        }
      );

      return projectId;
    } catch (error) {
      console.error("addPersonToProject", error);
      return null;
    }
  }

  async removePersonFromProject(projectId: string, userId: string) {
    const timestamp = this.timestamp;

    try {
      await this.db.collection<Project>("projects").doc(projectId).update(
        {
          updatedAt: timestamp,
          updatedBy: userId,
          users: firebase.firestore.FieldValue.arrayRemove(userId)
        }
      );

      return projectId;
    } catch (error) {
      console.error("removePersonFromProject", error);
      return null;
    }
  }

  async addTask(userId: string, title: string, description: string, projectId: string, index: number): Promise<string> {
    const id = this.newId;
    const timestamp = this.timestamp;
    const taskItem = new TaskItem(id, projectId, timestamp, timestamp, userId, userId, title, description, index);
    try {
      await this.db.collection<Task>("tasks").doc(id).set(taskItem.toObject());
      await this.addSummary(id);
      return id;
    } catch (error) {
      console.error("addTask", error);
      return null;
    }
  }

  async updateTask(userId: string, newTitle: string, newDescription: string, task: Task): Promise<string> {
    const timestamp = this.timestamp;
    try {
      await this.db.collection<Task>("tasks").doc(task.id).update(
        {
          title: newTitle,
          description: newDescription,
          updatedAt: timestamp,
          updatedBy: userId
        }
      );

      return task.id;
    } catch (error) {
      console.error("updateTask", error);
      return null;
    }
  }

  async deleteTask(taskId: string): Promise<string> {
    try {
      const subtasks$ = this.getSubTasks(taskId);
      subtasks$.pipe(take(1)).subscribe((subTasks: SubTask[]) => {
        if (subTasks) {
          const batch = this.db.firestore.batch();
          subTasks.forEach((subTask) => {
            const subTaskRef = this.db.collection("subtasks").doc(subTask.id).ref;
            batch.delete(subTaskRef);
          });

          batch.commit();
        }
      });
      await this.deleteSummary(taskId);
      await this.db.collection("tasks").doc(taskId).delete();
      return Promise.resolve(taskId);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async addPersonToTask(taskId: string, userId: string) {
    const timestamp = this.timestamp;

    try {
      await this.db.collection<Task>("tasks").doc(taskId).update(
        {
          updatedAt: timestamp,
          updatedBy: userId,
          users: firebase.firestore.FieldValue.arrayUnion(userId)
        }
      );

      return taskId;
    } catch (error) {
      console.error("addPersonToTask", error);
      return null;
    }
  }

  async removePersonFromTask(taskId: string, userId: string) {
    const timestamp = this.timestamp;

    try {
      await this.db.collection<Task>("subtasks").doc(taskId).update(
        {
          updatedAt: timestamp,
          updatedBy: userId,
          users: firebase.firestore.FieldValue.arrayRemove(userId)
        }
      );

      return taskId;
    } catch (error) {
      console.error("removePersonFromTask", error);
      return null;
    }
  }

  async markAllSubTasksAsCompleted(userId: string, taskId: string): Promise<string> {
    const subTasks = await this.getSubTasks(taskId).pipe(take(1)).toPromise();

    if (subTasks) {
      const batch = this.db.firestore.batch();
      subTasks.forEach((subTask) => {
        const taskRef = this.db.collection('subtasks').doc(subTask.id).ref;
        batch.update(taskRef, {
          users: firebase.firestore.FieldValue.arrayUnion(userId),
          completed: true
        });
      });

      const summaryRef = this.db.collection<Summary>("summaries").doc<Summary>(taskId).ref;
      batch.update(summaryRef, {
        numberOfItemsCompleted: subTasks.length
      });

      try {
        await batch.commit();
        return Promise.resolve(taskId);
      } catch (error) {
        console.error("markAllSubTasksAsCompleted", error);
        return Promise.reject(error);
      }
    }
  }

  async addSubTask(userId: string, title: string, projectId: string, taskId: string): Promise<string> {
    const id = this.newId;
    const timestamp = this.timestamp;
    const subTaskItem = new SubTaskItem(id, projectId, taskId, timestamp, timestamp, userId, userId, title);
    try {
      await this.db.collection<SubTask>("subtasks").doc(id).set(subTaskItem.toObject());
      return id;
    } catch (error) {
      console.error("addSubTask", error);
      return null;
    }
  }

  async updateSubTask(userId: string, newTitle: string, subTask: SubTask): Promise<string> {
    const timestamp = this.timestamp;

    try {
      await this.db.collection<SubTask>("subtasks").doc(subTask.id).update(
        {
          title: newTitle,
          updatedAt: timestamp,
          updatedBy: userId
        }
      );

      return subTask.id;
    } catch (error) {
      console.error("updateSubTask", error);
      return null;
    }
  }

  async addPersonToSubTask(subTaskId: string, userId: string) {
    const timestamp = this.timestamp;

    try {
      await this.db.collection<SubTask>("subtasks").doc(subTaskId).update(
        {
          updatedAt: timestamp,
          updatedBy: userId,
          users: firebase.firestore.FieldValue.arrayUnion(userId)
        }
      );

      return subTaskId;
    } catch (error) {
      console.error("addPersonToSubTask", error);
      return null;
    }
  }

  async removePersonFromSubTask(subTaskId: string, userId: string) {
    const timestamp = this.timestamp;

    try {
      await this.db.collection<SubTask>("subtasks").doc(subTaskId).update(
        {
          updatedAt: timestamp,
          updatedBy: userId,
          users: firebase.firestore.FieldValue.arrayRemove(userId)
        }
      );

      return subTaskId;
    } catch (error) {
      console.error("removePersonFromSubTask", error);
      return null;
    }
  }

  async updateSubTaskCompleteStatus(subTaskId: string, userId: string, completed: boolean) {
    const timestamp = this.timestamp;

    try {
      await this.db.collection<SubTask>("subtasks").doc(subTaskId).update(
        {
          updatedAt: timestamp,
          updatedBy: userId,
          completed
        }
      );

      return subTaskId;
    } catch (error) {
      console.error("updateSubTaskCompleteStatus", error);
      return null;
    }
  }

  async deleteSubTask(subTask: SubTask): Promise<string> {
    try {
      await this.db.collection<SubTask>("subtasks").doc(subTask.id).delete();
      return Promise.resolve(subTask.id);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  getTasks(projectId: string) {
    return this.db.collection<Task>("tasks", (ref) => {
      return ref.where("projectId", "==", projectId).orderBy("index").orderBy("title");
    }).valueChanges();
  }

  getTask(taskId: string) {
    return this.db.collection<Task>("tasks").doc<Task>(taskId).valueChanges().pipe(take(1)).toPromise();
  }

  getSubTasks(taskId: string) {
    return this.db.collection<SubTask>("subtasks", (ref) => {
      return ref.where("taskId", "==", taskId);
    }).valueChanges();
  }

  updateTasksIndex(tasks: Task[]): Promise<void> {
    const batch = this.db.firestore.batch();
    tasks.forEach((task, index) => {
      const taskRef = this.db.collection('tasks').doc(task.id).ref;
      batch.update(taskRef, {
        index
      });
    });

    return batch.commit().catch(error => console.error("updateTasksIndex", error));
  }

  getSummary(id: string) {
    return this.db.collection<Summary>("summaries").doc<Summary>(id).valueChanges();
  }

  private async addSummary(itemId: string) {
    const summary: Summary = {
      id: itemId,
      numberOfComments: 0,
      numberOfItems: 0,
      numberOfItemsCompleted: 0,
      commentsUpdatedAt: this.timestamp
    };
    try {
      await this.db.collection<Summary>("summaries").doc(itemId).set(summary);
      return itemId;
    } catch (error) {
      console.error("addSummary", error);
      return null;
    }
  }

  private deleteSummary(itemId: string) {
    return this.db.collection<Summary>("summaries").doc(itemId).delete();
  }
}
