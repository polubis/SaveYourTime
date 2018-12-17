import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-empty-list',
  templateUrl: './empty-list.component.html',
  styleUrls: ['./empty-list.component.scss']
})
export class EmptyListComponent{
  @Input() header: string;
  @Output() clicking = new EventEmitter<void>();
}
