import { Component, OnInit, Input } from '@angular/core';
import { TemplateSubTask } from 'src/app/models/template.model';
import { TemplateService } from 'src/app/services/template.service';

@Component({
  selector: 'app-template-subtask-item',
  templateUrl: './template-subtask-item.component.html',
  styleUrls: ['./template-subtask-item.component.scss']
})
export class TemplateSubtaskItemComponent implements OnInit {
  @Input() editMode = false;
  @Input() templateSubTask: TemplateSubTask;
  constructor(private templateService: TemplateService) { }

  ngOnInit() {
  }

  editSubTask() {
    this.templateService.updateTemplateSubTask(this.templateSubTask);
  }

  deleteSubTask() {
    this.templateService.deleteTemplateSubTask(this.templateSubTask);
  }
}
