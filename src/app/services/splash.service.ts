import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SplashService {
  splashShow: Subject<boolean> = new Subject<boolean>();
  constructor() { }
}
