import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { InputBase } from "src/app/services/input-base";
import { Setting } from "src/app/components/utils/form/form";
import { IDropzone } from "src/app/components/utils/dropzone/dropzone";

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss']
})
export class DropzoneComponent implements OnInit {
  @Input() disabled = false;
  @Input() config: IDropzone;
  @Output() dropped = new EventEmitter<File | File[]>();

  constructor() {
  }

  ngOnInit() {
  }

  handleFilesDrop(files: File[]) {
    this.dropped.emit(files);
  }
}
