import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['../tutorials.component.scss']
})
export class TutorialComponent {
  @Input() header;
  @Input() step;
  @Input() subHeader;
  @Input() content;
  @Input() sumarize;
}
