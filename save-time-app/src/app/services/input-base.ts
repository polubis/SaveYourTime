import { EventEmitter, Output, Input } from "@angular/core";
import { ValidationService } from "src/app/components/utils/form/validation.service";
import { Setting } from "src/app/components/utils/form/form";

export class InputBase extends ValidationService {
  isDoingAsync = false;
  preview: any;
  error = '';
  setting: Setting;
  @Output() changing = new EventEmitter<any>();
  @Input() value?: any;
  constructor(setting: Setting) {
    super();
    this.setting = setting;
  }

  clearError() {
    this.error = '';
  }

  onFilePicked(e: Event) {
    e.preventDefault();
    this.isDoingAsync = true;
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.error = super.runInputValidation(file, this.setting);
      if (!this.error) {
        this.preview = reader.result;
        this.changing.emit(file);
      }
      this.isDoingAsync = false;
    };
    reader.readAsDataURL(file);
  }
}