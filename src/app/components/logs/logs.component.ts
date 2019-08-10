import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Log } from 'src/app/models/log.model';
import { Subscription, Observable } from 'rxjs';
import { FilterItem } from '../shared/filter/filter.component';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit, OnDestroy {
  logs$: Observable<Log[]>;
  filterTitle = "Log filter";
  filterItems: FilterItem[];
  private currentFilter = 1;
  private logSub: Subscription;
  constructor(
    private firestoreService: FirestoreService,
    private navbarService: NavbarService) { }

  ngOnInit() {
    this.navbarService.setNavbarTitleWithColor({
      title: "Log",
      colorState: "log"
    });

    this.filterItems  = [
      {value: 1, text: 'Alle Log Typer', selected: this.currentFilter === 1},
      {value: 2, text: 'Fejl', selected: this.currentFilter === 2},
      {value: 3, text: 'Info', selected: this.currentFilter === 3},
      {value: 4, text: 'Brugere', selected: this.currentFilter === 4},
    ];

    this.getLogs(this.currentFilter);
  }

  ngOnDestroy(): void {
    if (this.logSub) {
      this.logSub.unsubscribe();
    }
  }

  private getLogs(filterValue: number) {
    switch (filterValue) {
      case 1:
        this.logs$ = this.firestoreService.getAllLogs();
        break;
      case 2:
        this.logs$ = this.firestoreService.getErrorLogs();
        break;
      case 3:
        this.logs$ = this.firestoreService.getInfoLogs();
        break;
      case 4:
        this.logs$ = this.firestoreService.getUserLogs();
        break;
    }

  }

  filterChange(filter: number) {
    this.currentFilter = filter;
    this.getLogs(this.currentFilter);
  }
}
