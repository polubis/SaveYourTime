import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  template: `
  <div [class]="'modal ' + classes">
    <ng-content></ng-content>
  </div>

  <div (click)="closing.emit()" class="backdrop"></div>
`,
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() classes = '';
  @Output() closing = new EventEmitter<void>();
}
