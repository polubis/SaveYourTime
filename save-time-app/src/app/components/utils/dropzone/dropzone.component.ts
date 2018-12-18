import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss']
})
export class DropzoneComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  handleFilesDrop(files: any) {
    console.log(files);
  }
}
