import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }
}
