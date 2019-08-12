import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';
import { TemplateService } from 'src/app/services/template.service';
import { Template } from 'src/app/models/template.model';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html'
})
export class TemplatesComponent implements OnInit {
  editMode = false;
  addMode = false;
  singleEditMode = false;
  templates: Template[] = [];
  constructor(private templateService: TemplateService, private navbarService: NavbarService, private route: ActivatedRoute) { }

  ngOnInit() {
    const action = this.route.snapshot.params.action;
    const templateId = this.route.snapshot.params.templateId;
    if (action && action === "edit") {
      this.editMode = true;
      this.navbarService.setNavbarTitleWithColor({
        title: templateId ? "Rediger Skabelon" : "Rediger Skabeloner",
        colorState: "template"
      });
    } else {
      this.editMode = false;
      if (action && action === "add") {
        this.addMode = true;
      }
      this.navbarService.setNavbarTitleWithColor({
        title: "Skabeloner",
        colorState: "template"
      });
    }

    if (templateId) {
      this.singleEditMode = true;
      this.templateService.getTemplate(templateId).subscribe((template) => {
        this.templates = template;
      });
    } else {
      this.templateService.getTemplates().subscribe((templates: Template[]) => {
        this.templates = templates;
      });
    }
  }

  async addTemplate() {
    await this.templateService.addTemplate();
  }
}
