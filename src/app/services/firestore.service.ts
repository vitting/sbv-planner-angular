import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { AuthService } from './auth.service';
import { ProjectItem, Project } from '../models/project.model';
import { TaskItem, Task } from '../models/task.model';

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

  getTasks(projectId: string) {
    return this.db.collection<Task>("tasks", (ref) => {
      return ref.where("projectId", "==", projectId).orderBy("index").orderBy("title");
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
