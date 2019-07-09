import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appItemContainer]'
})
export class ItemContainerDirective implements OnInit {
  constructor(private elemRef: ElementRef, private render: Renderer2) { }

  ngOnInit(): void {
    this.render.addClass(this.elemRef.nativeElement, "app-item-container");
  }
}
