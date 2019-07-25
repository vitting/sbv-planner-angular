import { Component, OnInit, Input } from '@angular/core';
import { Template, TemplateTask } from 'src/app/models/template.model';
import { TemplateService } from 'src/app/services/template.service';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-template-item',
  templateUrl: './template-item.component.html',
  styleUrls: ['./template-item.component.scss']
})
export class TemplateItemComponent implements OnInit {
  @Input() editMode = false;
  @Input() template: Template;
  @Input() addMode = false;
  templateTasks: TemplateTask[] = [];
  constructor(private templateService: TemplateService, private projectService: ProjectService, private router: Router) { }

  ngOnInit() {
    this.templateService.getTemplateTasks(this.template.id).subscribe((templateTasks) => {
      this.templateTasks = templateTasks;
    });
  }

  editTitleDesc() {
    this.templateService.updateTemplate(this.template);
  }

  deleteTemplate() {
    this.templateService.deleteTemplate(this.template);
  }

  editTemplate() {
    this.router.navigate(["templates", this.template.id, "edit"]);
  }

  addTask() {
    this.templateService.addTemplateTask(this.template);
  }

  createProjectFromTemplate() {
    this.projectService.createProjectFromTemplate(this.template);
  }
}
