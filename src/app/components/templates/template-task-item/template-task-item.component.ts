import { Component, OnInit, Input } from '@angular/core';
import { TemplateTask, Template, TemplateSubTask } from 'src/app/models/template.model';
import { TemplateService } from 'src/app/services/template.service';

@Component({
  selector: 'app-template-task-item',
  templateUrl: './template-task-item.component.html',
  styleUrls: ['./template-task-item.component.scss']
})
export class TemplateTaskItemComponent implements OnInit {
  @Input() editMode = false;
  @Input() templateTask: TemplateTask;
  templateSubTasks: TemplateSubTask[] = [];
  constructor(private templateService: TemplateService) { }

  ngOnInit() {
    this.templateService.getTemplateSubTasks(this.templateTask.id).subscribe((templateSubTasks) => {
      this.templateSubTasks = templateSubTasks;
    });
  }

  editTitleDesc() {
    this.templateService.updateTemplateTask(this.templateTask);
  }

  deleteTask() {
    this.templateService.deleteTemplateTask(this.templateTask);
  }

  addSubTask() {
    this.templateService.addTemplateSubTask(this.templateTask);
  }
}
