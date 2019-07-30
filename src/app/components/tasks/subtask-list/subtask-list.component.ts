import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { SubTask } from 'src/app/models/subtask.model';
import { Observable } from 'rxjs';
import { SubTaskCheckboxStateInfo, SubTaskPerson } from './subtask-list-item/subtask-list-item.component';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-subtask-list',
  templateUrl: './subtask-list.component.html',
  styleUrls: ['./subtask-list.component.scss']
})
export class SubtaskListComponent implements OnInit {
  @Input() task: Task;
  @Input() showButton = false;
  @Input() editMode = true;
  subtasks$: Observable<SubTask[]>;
  constructor(
    private taskService: TaskService) { }

  ngOnInit() {
    if (this.task) {
      this.subtasks$ = this.taskService.getSubTasks(this.task.id);
    }
  }

  async addSubTask(task: Task) {
    const result = await this.taskService.addSubTask(task);
  }

  async editSubTask(subTask: SubTask) {
    const result = await this.taskService.editSubTask(subTask);
  }

  async deleteSubTask(subTask: SubTask) {
    const result = await this.taskService.deleteSubTask(subTask);
  }

  async addPerson(subTask: SubTask) {
    const result = await this.taskService.addUserToSubTask(subTask.id);
  }

  async removePerson(subTaskPerson: SubTaskPerson) {
    const result = await this.taskService.removeUserFromSubTask(subTaskPerson.subTask.id, subTaskPerson.user.id);
  }

  async checkboxClicked(status: SubTaskCheckboxStateInfo) {
    const result = await this.taskService.updateSubTaskCompleteStatus(status.subTask.id, status.completed);
  }
}
