import { Directive, HostListener, HostBinding, Input, EventEmitter, Output, OnInit } from "@angular/core";
import { Subscription, Subject } from "rxjs";
import { debounceTime, tap, filter } from "rxjs/operators";

@Directive({
  selector: "[dropzone]"
})
export class Dropzone implements OnInit {
  isMouseAtElement = false;
  subscription: Subscription;
  private drag = new Subject<Event>();

  @Input() defaultClass: string = 'dropzone';
  @Input() dragingClass: string = 'dragging';
  @Input() droppingClass: string = 'dropped';

  @HostBinding('class')
  elementClass = '';

  ngOnInit() {
    this.elementClass = this.defaultClass;
    this.subscription = this.drag.pipe(
      )
      .subscribe((e: Event) => {
        this.isMouseAtElement = true;
        this.elementClass = this.defaultClass + ' ' + this.dragingClass;
      });
  }

  constructor() {
  }

  @Output() filesDropped = new EventEmitter<any>();

  @HostListener('drop', ['$event'])
    onDrop($event) {
      $event.preventDefault();
      let transfer = $event.dataTransfer;
      this.filesDropped.emit(transfer.files);
      this.elementClass = this.defaultClass + ' ' + this.droppingClass;
      setTimeout(() => {
        this.elementClass = this.defaultClass;
      }, 500);
    }

  @HostListener('dragover', ['$event'])
    onDragOver($event) {
      $event.preventDefault();
      this.drag.next($event);
    }

  @HostListener('dragleave', ['$event'])
    onDragleave($event) {
      this.elementClass = this.defaultClass;
    }
}
