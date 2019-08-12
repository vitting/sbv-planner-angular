import { Component, OnInit, Input } from '@angular/core';
import { Template, TemplateTask } from 'src/app/models/template.model';
import { TemplateService } from 'src/app/services/template.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { state, trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-template-item',
  templateUrl: './template-item.component.html',
  styleUrls: ['./template-item.component.scss'],
  animations: [trigger("buttonRotate", [
    state("closed", style({
      transform: 'rotate(0)'
    })),
    state("opened", style({
      transform: 'rotate(180deg)'
    })),
    transition("closed <=> opened", animate("200ms"))
  ]), trigger("containerScale", [
    state("closed", style({
      height: 0,
      transform: 'scaleY(0)',
      opacity: 0,
      'padding-bottom': 0
    })),
    state("opened", style({
      height: 100,
      transform: 'scaleY(1)',
      opacity: 1,
      'padding-bottom': '10px'
    })),
    transition("closed => opened", animate("300ms ease-in")),
    transition("opened => closed", animate("300ms ease-out"))
  ])]
})
export class TemplateItemComponent implements OnInit {
  @Input() editMode = false;
  @Input() template: Template;
  @Input() addMode = false;
  templateTasks: TemplateTask[] = [];
  stateOpenClose = "closed";
  showExpand = false;
  constructor(
    private templateService: TemplateService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    if (this.editMode) {
      this.stateOpenClose = "opened";
    }

    this.templateService.getTemplateTasks(this.template.id).subscribe((templateTasks) => {
      this.templateTasks = templateTasks;
      this.showExpand = templateTasks.length !== 0;
      console.log(this.showExpand);
    });
  }

  editTitleDesc() {
    this.templateService.updateTemplate(this.template);
  }

  async deleteTemplate() {
    const result = await this.templateService.deleteTemplate(this.template);
    if (result) {
      this.router.navigate(["templates"]);
    }
  }

  editTemplate() {
    if ("showback" in this.route.snapshot.queryParams) {
      console.log(this.route.snapshot.queryParams);

    }
    this.router.navigate(["templates", this.template.id, "edit"]);
  }

  addTask() {
    this.templateService.addTemplateTask(this.template);
  }

  async createProjectFromTemplate() {
    const result = await this.projectService.createProjectFromTemplate(this.template);
    if (result) {
      this.router.navigate(["/"]);
    }
  }

  openClose() {
    this.stateOpenClose = this.stateOpenClose === "closed" ? "opened" : "closed";
  }
}
