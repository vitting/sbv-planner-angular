import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  projectId: string;
  constructor(private route: ActivatedRoute, private navbarService: NavbarService) { }

  ngOnInit() {
    this.navbarService.setNavbarTitle("Opgaver");
    this.projectId = this.route.snapshot.params.projectId;
    console.log(this.projectId);

  }

}
