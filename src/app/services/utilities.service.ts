import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(private db: AngularFirestore) { }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  get id(): string {
    return this.db.createId();
  }
}
