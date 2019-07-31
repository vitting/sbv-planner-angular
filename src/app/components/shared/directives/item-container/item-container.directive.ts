import { Directive, ElementRef, Renderer2, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appItemContainer]'
})
export class ItemContainerDirective implements OnInit {
  @Input('appItemContainer') backgroundColor: string;
  constructor(private elemRef: ElementRef, private render: Renderer2) { }

  ngOnInit(): void {
    this.render.addClass(this.elemRef.nativeElement, "app-item-container");
    switch (this.backgroundColor) {
      case "proejct":
        this.render.addClass(this.elemRef.nativeElement, "app-item-container-project");
        break;
      case "task":
        this.render.addClass(this.elemRef.nativeElement, "app-item-container-task");
        break;
      case "subtask":
        this.render.addClass(this.elemRef.nativeElement, "app-item-container-subtask");
        break;
      case "comment":
        this.render.addClass(this.elemRef.nativeElement, "app-item-container-comment");
        break;
      case "comment-user":
        this.render.addClass(this.elemRef.nativeElement, "app-item-container-comment-user");
        break;
      case "user":
        this.render.addClass(this.elemRef.nativeElement, "app-item-container-user");
        break;
      case "template":
        this.render.addClass(this.elemRef.nativeElement, "app-item-container-template");
        break;
      case "template-task":
        this.render.addClass(this.elemRef.nativeElement, "app-item-container-template-task");
        break;
      case "template-subtask":
        this.render.addClass(this.elemRef.nativeElement, "app-item-container-template-subtask");
        break;
      case "setting":
        this.render.addClass(this.elemRef.nativeElement, "app-item-container-setting");
        break;
      case "message":
        this.render.addClass(this.elemRef.nativeElement, "app-item-container-message");
        break;
    }
  }
}
