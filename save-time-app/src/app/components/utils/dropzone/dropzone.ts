import { Directive, HostListener, HostBinding, Input, EventEmitter, Output, OnInit } from "@angular/core";
import { AppState } from "src/app/app.reducers";
import { Store } from "@ngrx/store";
import { TryPushNotification } from "src/app/store/notifications/actions";
import { Notification } from '../../../models/notification';
import { Validators } from "src/app/components/utils/form/validation.service";
import { interval } from "rxjs";

export interface ValidatorConfig {
  content: string;
  value: any;
}

export interface IDropzone {
  blackList?: ValidatorConfig;
  size?: ValidatorConfig;
  filesTypes?: ValidatorConfig;
  maxFiles: ValidatorConfig;
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
      if (this.configFunctionsRefs[ruleName]) {
        const error = this.configFunctionsRefs[ruleName](file, config[ruleName]);
        if (error) {
          return  file.name + ' ' + error;
        }
      }
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
  @Input() disabled = false;

  @HostBinding('class')
  elementClass = '';

  ngOnInit() {
    this.elementClass = this.defaultClass;
  }
  constructor(private store: Store<AppState>) {super();}

  @HostListener('drop', ['$event'])
    onDrop($event) {
      $event.preventDefault();

      if (!this.disabled) {
        const files: File[] = $event.dataTransfer.files;
        const filesLength = files.length;
        const correctFiles: File[] = [];

        if(filesLength > 0) {

          const { value, content } = this.config.maxFiles;
            //filesLengty > valuye
          if (filesLength === 0) {
            this.handlePromptingErrors(content + value.toString(), 'dropzone');
            this.elementClass = this.defaultClass;
          }
          else {
            this.elementClass = this.defaultClass + ' ' + this.droppingClass;
            setTimeout(() => {
              this.elementClass = this.defaultClass;
            }, 500);

            for(let key in files) {
              if(files[key].size) {
                const file: File = files[key];
                const error = super.check(file, this.config);
                if (error) {
                  setTimeout(() => {
                    this.handlePromptingErrors(error, 'dropzone' + file.name);
                  }, 150);
                  this.elementClass = this.defaultClass;
                } else {
                  correctFiles.push(file);
                }
              }
            }

            this.filesDropped.emit(correctFiles);
          }

        } else {
          this.elementClass = this.defaultClass;
        }
      }

    }

  @HostListener('dragover', ['$event'])
    onDragOver($event) {
      $event.preventDefault();
      if (!this.disabled) {
        this.elementClass = this.defaultClass + ' ' + this.dragingClass;
      }
    }

  @HostListener('dragleave', ['$event'])
    onDragleave($event) {
      if (!this.disabled) {
        this.elementClass = this.defaultClass;
      }
    }

  handlePromptingErrors(content: string, id: any) {
    const notification = new Notification(content, 'error', id, false);
    this.store.dispatch(new TryPushNotification(notification));
  }
}
