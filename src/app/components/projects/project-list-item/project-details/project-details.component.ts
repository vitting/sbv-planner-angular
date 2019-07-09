import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  @Input() projectDate: Date;
  @Input() taskTotal = 0;
  @Input() taskCompleted = 0;
  constructor() { }

  ngOnInit() {
  }

}
