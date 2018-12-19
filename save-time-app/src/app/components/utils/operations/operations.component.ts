import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from "src/app/app.reducers";
import { Store } from "@ngrx/store";
import { IFileToExtract } from "src/app/store/operations/reducers";
import { Subscription } from "rxjs";
import { getFilesToExtract } from '../../../store/index';
import { Tesseract } from "tesseract.ts";
import { OperationState, Operation } from "src/app/models/operation-state";
import { TryRemoveOperation } from "src/app/store/operations/actions";
import { filter } from "rxjs/operators";
@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss']
})
export class OperationsComponent implements OnInit, OnDestroy {
  statusIcons = {
    error: 'cloud_off',
    ok: 'done'
  };

  constructor(private store: Store<AppState>) { }

  previewOpened = false;
  containsOperations = false;

  operationsKeys: string[] = [];
  operations: Operation = null;

  filesSubscription: Subscription;
  ngOnInit() {
    this.filesSubscription = this.store.select(getFilesToExtract).pipe(filter(files => files ? true : false))
      .subscribe((files: IFileToExtract) => {
        const filesKeys: string[] = Object.keys(files);
        const filesLength = filesKeys.length;

        if (filesLength === 0) {
          this.previewOpened = false;
          this.containsOperations = false;
        }
        else if (filesLength > this.operationsKeys.length) {
          const operationState = new OperationState(true, '', 0, 'starting extracing data from file...');
          const operationName = filesKeys[filesLength-1];

          const operation: Operation = {
            [operationName]: operationState
          };
          this.operations = { ...this.operations, ...operation };

          this.previewOpened = true;
          this.containsOperations = true;
          this.convertImageToText(files[operationName], operationName);
        }

        this.operationsKeys = filesKeys;
      });
  }

  ngOnDestroy() {
    this.filesSubscription.unsubscribe();
  }

  togle(key: string) {
    this[key] = !this[key];
  }

  onConfirm(key: string) {
    this.store.dispatch(new TryRemoveOperation(key));
  }

  onRetry(id: string) {

  }

  convertImageToText(file: File, key: string) {
    Tesseract.recognize(file, {lang: 'pol'})
    .progress(progress => {
      this.operations[key] = new OperationState(true, '', Math.round(progress.progress * 100), progress.status);
    })
    .finally(response => {
      this.operations[key] = new OperationState(false, 'ok', 100, 'succesfully extracted');
    })
  }
}

// if(files) {
//   const keys = Object.keys(files);
//   const keysCount = keys.length;
//   if(keysCount > 0 && keysCount > this.operationsKeys.length) {
//     const operationState = new OperationState(true, '', 0, 'starting extracing data from file...');
//     const operationName = keys[keysCount-1];

//     const operation: Operation = {
//       [operationName]: operationState
//     };
//     this.operations = { ...this.operations, ...operation };
//     this.previewOpened = true;
//     this.containsOperations = true;

//     this.convertImageToText(files[operationName], operationName);
//   } else {
//     this.previewOpened = false;
//     this.containsOperations = false;

//   }
//   this.operationsKeys = keys;
// }
