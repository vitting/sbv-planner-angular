import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { ProjectItem, Project } from '../models/project.model';
import { TaskItem, Task } from '../models/task.model';
import { take, switchMap, tap, map } from 'rxjs/operators';
import { SubTaskItem, SubTask } from '../models/subtask.model';
import { User, UserItem } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { Comment, CommentItem } from '../models/comment.model';
import { Summary } from '../models/summary.model';

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

  async addComment(user: User, text: string, type: string, itemId: string): Promise<string> {
    const id = this.newId;
    const timestamp = this.timestamp;
    const comment = new CommentItem(id, itemId, text, timestamp, timestamp, type, user.id);
    try {
      await this.db.collection<Comment>("comments").doc(id).set(comment.toObject());
      await this.updateSummaryComments(itemId, SummaryAction.add);
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

  async deleteComment(commentId: string, itemId: string): Promise<string> {
    try {
      await this.updateSummaryComments(itemId, SummaryAction.delete);
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

  async addUser(userId: string, name: string): Promise<User> {
    const timestamp = this.timestamp;
    const user: User = new UserItem(userId, name, timestamp).toObject();
    try {
      await this.db.collection<User>("users").doc(userId).set(user);
      return user;
    } catch (error) {
      console.error("AddUser", error);
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
          this.deleteTask(task.id, projectId);
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
      await this.updateSummaryItemsTotal(projectId, SummaryAction.add);
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

  async deleteTask(taskId: string, projectId: string): Promise<string> {
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
      await this.updateSummaryItemsTotal(projectId, SummaryAction.delete);
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
      this.updateSummaryItemsTotal(taskId, SummaryAction.add);
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

  async updateSubTaskCompleteStatus(subTaskId: string, userId: string, completed: boolean, taskId: string) {
    const timestamp = this.timestamp;

    try {
      await this.db.collection<SubTask>("subtasks").doc(subTaskId).update(
        {
          updatedAt: timestamp,
          updatedBy: userId,
          completed
        }
      );

      await this.updateSummaryItemsCompleted(taskId, completed ? SummaryAction.add : SummaryAction.delete);
      return subTaskId;
    } catch (error) {
      console.error("updateSubTaskCompleteStatus", error);
      return null;
    }
  }

  async deleteSubTask(subTask: SubTask): Promise<string> {
    try {
      await this.updateSummaryItemsTotal(subTask.taskId, SummaryAction.delete);
      if (subTask.completed) {
        await this.updateSummaryItemsCompleted(subTask.taskId, SummaryAction.delete);
      }
      await this.db.collection<SubTask>("subtasks").doc(subTask.id).delete();
      return Promise.resolve(subTask.id);
    } catch (error) {
      return Promise.reject(error) ;
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
    };
    try {
      await this.db.collection<Summary>("summaries").doc(itemId).set(summary);
      return itemId;
    } catch (error) {
      console.error("addSummary", error);
      return null;
    }
  }

  private async updateSummaryComments(itemId: string, action: SummaryAction) {
    const summary = await this.getSummaryPromise(itemId);
    if (action === SummaryAction.add) {
      summary.numberOfComments++;
    } else {
      if (summary.numberOfComments > 0) {
        summary.numberOfComments--;
      }
    }

    return this.updateSummary(itemId, summary);
  }

  private async updateSummaryItemsCompleted(itemId: string, action: SummaryAction) {
    const summary = await this.getSummaryPromise(itemId);
    if (action === SummaryAction.add) {
      summary.numberOfItemsCompleted++;
    } else {
      if (summary.numberOfItemsCompleted > 0) {
        summary.numberOfItemsCompleted--;
      }
    }

    return this.updateSummary(itemId, summary);
  }

  private async updateSummaryItemsTotal(itemId: string, action: SummaryAction) {
    const summary = await this.getSummaryPromise(itemId);
    if (action === SummaryAction.add) {
      summary.numberOfItems++;
    } else {
      if (summary.numberOfItems > 0) {
        summary.numberOfItems--;
      }
    }

    return this.updateSummary(itemId, summary);
  }

  private getSummaryPromise(itemId: string) {
    return this.db.collection<Summary>("summaries").doc<Summary>(itemId).valueChanges().pipe(take(1)).toPromise();
  }

  private updateSummary(itemId: string, summary: Summary) {
    return this.db.collection<Summary>("summaries").doc(itemId).update(summary);
  }

  private deleteSummary(itemId: string) {
    return this.db.collection<Summary>("summaries").doc(itemId).delete();
  }
}
