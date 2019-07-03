import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  title = "Mine projekter";
  showLogin = true;
  constructor(private navbarService: NavbarService) { }

  ngOnInit() {
    this.navbarService.navbarTitle.subscribe((title: string) => {
      this.title = title;
    });
  }

}
