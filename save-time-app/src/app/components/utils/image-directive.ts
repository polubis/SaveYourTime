import { Directive, HostListener, Input, ElementRef, Renderer2, HostBinding, OnInit } from '@angular/core';
@Directive({
  selector: "[image]"
})
export class ImageDirective implements OnInit {
  @Input() imageClass: string = '';
  @Input() baseClass: string;
  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    this.elementClass = this.baseClass;
  }

  @HostBinding('class')
  elementClass = '';

  @HostListener("error", ["$event"])
  handleBrokenImage(event) {
    this.el.nativeElement.src = '../../../assets/broken-image.svg';
    if (this.imageClass) {
      this.elementClass = 'broken-image';
    }
  }
}
