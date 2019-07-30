import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-user-admin-item',
  templateUrl: './user-admin-item.component.html',
  styleUrls: ['./user-admin-item.component.scss']
})
export class UserAdminItemComponent implements OnInit {
  @Input() user: User;
  adminState: boolean;
  editorState: boolean;
  activeState: boolean;
  constructor(private userService: UserService) { }

  ngOnInit() {
    if (this.user) {
      this.adminState = this.user.admin;
      this.editorState = this.user.editor;
      this. activeState = this.user.active;
    }
  }

  async admin({checked, source}: MatSlideToggleChange) {
    const result = await this.userService.updateUserAdminState(this.user, checked);
    if (result) {
      this.adminState = checked;
    } else {
      source.checked = this.adminState;
    }
  }

  async editor({checked, source}: MatSlideToggleChange) {
    const result = await this.userService.updateUserEditorState(this.user, checked);
    if (result) {
      this.editorState = checked;
    } else {
      source.checked = this.editorState;
    }
  }

  async active({checked, source}: MatSlideToggleChange) {
    const result = await this.userService.updateUserActiveState(this.user, checked);
    if (result) {
      this.activeState = checked;
    } else {
      source.checked = this.activeState;
    }
  }
}
