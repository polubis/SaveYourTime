import { Directive, HostListener, Input, ElementRef, Renderer2 } from '@angular/core';
@Directive({
  selector: "[image]"
})
export class ImageDirective {
  constructor(private el: ElementRef) {
  }

  @HostListener("error", ["$event"])
  handleBrokenImage(event) {
    this.el.nativeElement.src = '../../../assets/broken-image.svg';
  }
}
