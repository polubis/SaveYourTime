import { Directive, HostListener, HostBinding, Input, EventEmitter, Output, OnInit } from "@angular/core";
import { AppState } from "src/app/app.reducers";
import { Store } from "@ngrx/store";
import { TryPushNotification } from "src/app/store/notifications/actions";
import { Notification } from '../../../models/notification';
import { Validators } from "src/app/components/utils/form/validation.service";

export interface ValidatorConfig {
  content: string;
  value: any;
}

export interface IDropzone {
  blackList?: ValidatorConfig;
  size?: ValidatorConfig;
  filesTypes?: ValidatorConfig;
  maxFiles?: ValidatorConfig;
}

export class DropzoneBase extends Validators {
  constructor(){
    super();
  }

  configFunctionsRefs = {
    blackList: (file, config) => this.verifyBlackList(file, config),
    filesTypes: (file, config) => this.veryfiyFileTypes(file, config)
  };

  check(file: File, config: IDropzone) {
    const configKeys = Object.keys(config);

    for(let key in configKeys) {
      const ruleName = configKeys[key];
      const error = this.configFunctionsRefs[ruleName](file, config[ruleName]);
      if (error)
        return  file.name + ' ' + error;
    }

    return '';
  }

  verifyBlackList(file: File, config: ValidatorConfig) {
    return super.isNotOnBlackList(file, config.value) ? '' : config.content;
  }

  veryfiyFileTypes(file: File, config: ValidatorConfig) {
    return super.isNotInvalidFileFormat(file, config.value) ? '' : config.content;
  }
}

@Directive({
  selector: "[dropzone]"
})
export class Dropzone extends DropzoneBase implements OnInit {
  @Output() filesDropped = new EventEmitter<File[]>();
  @Input() defaultClass: string = 'dropzone';
  @Input() dragingClass: string = 'dragging';
  @Input() droppingClass: string = 'dropped';
  @Input() config?: IDropzone;

  @HostBinding('class')
  elementClass = '';


  ngOnInit() {
    this.elementClass = this.defaultClass;
  }
  constructor(private store: Store<AppState>) {super();}


  @HostListener('drop', ['$event'])
    onDrop($event) {
      $event.preventDefault();
      let transfer = $event.dataTransfer;

      if(transfer.files.length > 0) {

        const error = super.check(transfer.files[0], this.config);

        if (!error) {
          this.filesDropped.emit(transfer.files);
          this.elementClass = this.defaultClass + ' ' + this.droppingClass;
          setTimeout(() => {
            this.elementClass = this.defaultClass;
          }, 500);
        } else {
          const notification = new Notification(error, 'error', 'dropzone', false);
          this.store.dispatch(new TryPushNotification(notification));
          this.elementClass = this.defaultClass;
        }
      } else {
        this.elementClass = this.defaultClass;
      }
    }

  @HostListener('dragover', ['$event'])
    onDragOver($event) {
      $event.preventDefault();
      this.elementClass = this.defaultClass + ' ' + this.dragingClass;
    }

  @HostListener('dragleave', ['$event'])
    onDragleave($event) {
      this.elementClass = this.defaultClass;
    }
}
