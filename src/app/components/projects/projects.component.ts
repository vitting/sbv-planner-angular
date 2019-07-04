import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor(private navbarService: NavbarService) { }

  ngOnInit() {
    this.navbarService.navbarTitle.next("Mine Projekter");
  }

}
