import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  commentForm: FormGroup;
  constructor(private navbarService: NavbarService) { }

  ngOnInit() {
    this.navbarService.navbarTitle.next("Kommentar");
    this.commentForm = new FormGroup({
      comment: new FormControl(null)
    });
  }

  submit() {
    console.log(this.commentForm.value);

  }
}
