import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { ProjectItem, Project } from '../models/project.model';
import { TaskItem, Task } from '../models/task.model';
import { take } from 'rxjs/operators';
import { SubTaskItem, SubTask } from '../models/subtask.model';
import { User, UserItem } from '../models/user.model';
import { Observable } from 'rxjs';
import { Comment, CommentItem } from '../models/comment.model';
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
      return id;
    } catch (error) {
      console.error("AddComment", error);
      return null;
    }
  }

  async updateComment(userId: string, commentId: string, newText: string): Promise<string> {
    const timestamp = this.timestamp;

    try {
      await this.db.collection<Comment>("comments").doc(commentId).update(
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

  deleteComment(commentId: string) {
    return this.db.collection<Comment>("comments").doc(commentId).delete();
  }

  getComments(parentId: string, type: string): Observable<Comment[]> {
    return this.db.collection<Comment>("comments", (ref) => {
      return ref.where("parentId", "==", parentId).where("type", "==", type).where("active", "==", true).orderBy("createdAt");
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
      return id;
    } catch (error) {
      console.error("addProject", error);
      return null;
    }
  }

  async updateProject(userId: string, projectId: string, newTitle: string, newDescription: string): Promise<string> {
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

  deleteProject(projectId: string) {
    const tasks$ = this.getTasks(projectId);
    tasks$.pipe(take(1)).subscribe((tasks: Task[]) => {
      if (tasks) {
        tasks.forEach((task) => {
          this.deleteTask(task.id);
        });
      }
    });

    return this.db.collection<Project>("projects").doc(projectId).delete();
  }

  async addTask(userId: string, title: string, description: string, projectId: string, index: number): Promise<string> {
    const id = this.newId;
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
