import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Log } from 'src/app/models/log.model';
import { Subscription, Observable } from 'rxjs';
import { FilterItem } from '../shared/filter/filter.component';
import { NavbarService } from 'src/app/services/navbar.service';
import { NoDataBoxData } from '../shared/no-data-box/no-data-box.component';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit, OnDestroy {
  logs$: Observable<Log[]>;
  logs: Log[];
  filterTitle = "Log filter";
  filterItems: FilterItem[];
  nodata: NoDataBoxData;
  showNoData = false;
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

    this.nodata = {
      textline1: "Der ikke nogen log elementer.",
      textline2: ""
    };

    this.filterItems  = [
      {value: 1, text: 'Alle Log Typer', selected: this.currentFilter === 1},
      {value: 2, text: 'Fejl', selected: this.currentFilter === 2},
      {value: 3, text: 'Info', selected: this.currentFilter === 3},
      {value: 4, text: 'Brugere', selected: this.currentFilter === 4},
    ];

    this.getLogs(this.currentFilter);
  }

  ngOnDestroy(): void {
    this.unsubscribeLog();
  }

  private unsubscribeLog() {
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
        this.logs$ = this.firestoreService.getLogsByType("error");
        break;
      case 3:
        this.logs$ = this.firestoreService.getLogsByType("info");
        break;
      case 4:
        this.logs$ = this.firestoreService.getLogsByType("user");
        break;
    }

    this.unsubscribeLog();
    this.logSub = this.logs$.pipe(tap((logs) => {
      this.showNoData = logs.length === 0;
    })).subscribe((logs) => {
      this.logs = logs;
    });
  }

  filterChange(filter: number) {
    this.currentFilter = filter;
    this.getLogs(this.currentFilter);
  }
}
