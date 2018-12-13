import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  @Input() header: string;
  @Input() subHeader?: string;
  @Input() motive = 'danger';
  @Input() icon = 'delete';
  motives = {
    danger: {icon: 'danger-color', graphic: 'danger-bg'}
  };

  @Output() closing = new EventEmitter<void>();
  @Output() confirming = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

}
