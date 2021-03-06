import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { SplashService } from './services/splash.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private splashSub: Subscription;
  showSplash = true;
  constructor(
    private authService: AuthService, // can't be removed, else app breaks because authService isn't initialised early enough
    private splashService: SplashService) {}

  ngOnInit(): void {
    this.splashSub = this.splashService.splashShow.subscribe((showSplash) => {
      this.showSplash = showSplash;
    });
  }

  ngOnDestroy() {
    if (this.splashSub) {
      this.splashSub.unsubscribe();
    }
  }
}
