import { Directive, HostListener, HostBinding, Input, EventEmitter, Output, OnInit } from "@angular/core";
import { InputBase } from "src/app/services/input-base";
import { Setting } from "src/app/components/utils/form/form";
import { AppState } from "src/app/app.reducers";
import { Store } from "@ngrx/store";
import { TryPushNotification } from "src/app/store/notifications/actions";
import { Notification } from '../../../models/notification';

@Directive({
  selector: "[dropzone]"
})
export class Dropzone extends InputBase implements OnInit {
  @Input() blackList: string[];
  @Input() defaultClass: string = 'dropzone';
  @Input() dragingClass: string = 'dragging';
  @Input() droppingClass: string = 'dropped';

  @Input() givenSettings: Setting = null;

  @HostBinding('class')
  elementClass = '';

  ngOnInit() {
    this.elementClass = this.defaultClass;
    this.setting = this.givenSettings;
  }
  constructor(private store: Store<AppState>) {
    super();
  }
  @Output() filesDropped = new EventEmitter<File[]>();

  @HostListener('drop', ['$event'])
    onDrop($event) {
      $event.preventDefault();
      let transfer = $event.dataTransfer;

      if(transfer.files.length > 0) {

        this.onFileReaded(transfer.files[0]);
        this.isOnBlackList(transfer.files[0].name, this.blackList);

        if (!this.error) {
          this.filesDropped.emit(transfer.files);
          this.elementClass = this.defaultClass + ' ' + this.droppingClass;
          setTimeout(() => {
            this.elementClass = this.defaultClass;
          }, 500);
        } else {
          const notification = new Notification(this.error, 'error', 'dropzone', false);
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
