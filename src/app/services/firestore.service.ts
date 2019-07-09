import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { AuthService } from './auth.service';
import { ProjectItem, Project } from '../models/project.model';
import { TaskItem, Task } from '../models/task.model';
import { map, take, switchMap, mergeMap } from 'rxjs/operators';
import { SubTaskItem, SubTask } from '../models/subtask.model';
import { Observable, from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private db: AngularFirestore, private authService: AuthService) { }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  get newId(): string {
    return this.db.createId();
  }

  async addProject(title: string, description: string): Promise<string> {
    const id = this.newId;
    const userId = this.authService.userLoggedIn.uid;
    const timestamp = this.timestamp;

    const projectItem = new ProjectItem(id, title, description, timestamp, timestamp, userId);
    try {
      await this.db.collection<Project>("projects").doc(id).set(projectItem.toObject());
      return id;
    } catch (error) {
      console.error("addProject", error);
      return null;
    }
  }

  async addTask(title: string, description: string, projectId: string, index: number): Promise<string> {
    const id = this.newId;
    const userId = this.authService.userLoggedIn.uid;
    const timestamp = this.timestamp;
    const taskItem = new TaskItem(id, projectId, timestamp, timestamp, userId, userId, title, description, index);
    try {
      await this.db.collection<Task>("tasks").doc(id).set(taskItem.toObject());
      return id;
    } catch (error) {
      console.error("addTask", error);
      return null;
    }
  }

  async editTask(newTitle: string, newDescription: string, task: Task): Promise<string> {
    const userId = this.authService.userLoggedIn.uid;
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
      console.error("editTask", error);
      return null;
    }
  }

  deleteTask(taskId: string) {
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

    return this.db.collection("tasks").doc(taskId).delete();
  }

  async addSubTask(title: string, projectId: string, taskId: string): Promise<string> {
    const id = this.newId;
    const userId = this.authService.userLoggedIn.uid;
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

  async editSubTask(newTitle: string, subTask: SubTask): Promise<string> {
    const userId = this.authService.userLoggedIn.uid;
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
      console.error("editSubTask", error);
      return null;
    }
  }

  deleteSubTask(subTaskId: string) {
    return this.db.collection<SubTask>("subtasks").doc(subTaskId).delete();
  }

  getTasks(projectId: string) {
    return this.db.collection<Task>("tasks", (ref) => {
      return ref.where("projectId", "==", projectId).orderBy("index").orderBy("title");
    }).valueChanges();
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
}
