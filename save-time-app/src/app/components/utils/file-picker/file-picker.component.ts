import { Component, EventEmitter, Output, Input } from '@angular/core';
import { InputBase } from "src/app/services/input-base";
import { Setting } from "src/app/components/utils/form/form";

@Component({
  selector: 'app-file-picker',
  templateUrl: './file-picker.component.html',
  styleUrls: ['./file-picker.component.scss']
})
export class FilePickerComponent extends InputBase {
  @Input() classes = '';
  @Input() icon = 'add_a_photo';
  @Input() path: string;
  deleteOption = true;
  constructor() {
    super(new Setting('product picture', { isPicture: true, isFileWithCorrectSize: 300000 }, '', 'file'));
  }

  removeDeleteOption() {
    this.deleteOption = false;
  }

  enableDeleteOption() {
    this.deleteOption = true;
  }
}
