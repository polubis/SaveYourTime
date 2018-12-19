import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { InputBase } from "src/app/services/input-base";
import { Setting } from "src/app/components/utils/form/form";

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss']
})
export class DropzoneComponent implements OnInit {
  @Input() blackList: string[];
  @Output() dropped = new EventEmitter<File | File[]>();
  receiptSetting = new Setting('Receipt', { isPicture: true }, 'file', 'file');
  constructor() {
  }

  ngOnInit() {
  }

  handleFilesDrop(files: File[]) {
    this.dropped.emit(files);
  }
}
