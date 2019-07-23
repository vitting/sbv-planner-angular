import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from 'src/app/models/comment.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent implements OnInit {
  @Input() comment: Comment;
  @Output() menuClick = new EventEmitter<Comment>();
  showMenu = false;
  name = "";
  commentStyle = "comment";
  constructor(private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.userId === this.comment.userId) {
      this.showMenu = true;
      this.commentStyle = "comment-user";
    }

    const user = this.authService.getUserInfo(this.comment.userId);
    if (user) {
      this.name = user.name;
    }
  }

  menu() {
    this.menuClick.emit(this.comment);
  }
}
