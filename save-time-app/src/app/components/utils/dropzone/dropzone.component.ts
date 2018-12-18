import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { InputBase } from "src/app/services/input-base";
import { Setting } from "src/app/components/utils/form/form";

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss']
})
export class DropzoneComponent implements OnInit {
  @Input() mode = 'single';
  @Output() changed = new EventEmitter<any>();
  receiptSetting = new Setting('Receipt', { isPicture: true }, 'file', 'file');
  constructor() {
  }

  ngOnInit() {
  }

  handleFilesDrop(files: File[]) {
    this.changed.emit(this.mode === 'single' ? files[0] : files);
  }
}
