import { Directive, ElementRef, Renderer2, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appItemContainer]'
})
export class ItemContainerDirective implements OnInit {
  @Input('appItemContainer') backgroundColor: string;
  constructor(private elemRef: ElementRef, private render: Renderer2) { }

  ngOnInit(): void {
    this.render.addClass(this.elemRef.nativeElement, "app-item-container");
    switch(this.backgroundColor) {
      case "task":
        this.render.addClass(this.elemRef.nativeElement, "app-item-container-task");
        break;
      case "subtask":
        this.render.addClass(this.elemRef.nativeElement, "app-item-container-subtask");
        break;
      case "comment":
          this.render.addClass(this.elemRef.nativeElement, "app-item-container-comment");
          break;
    }
  }
}
