import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from "@ngrx/store";
import { Subscription, interval } from "rxjs";
import { Tesseract } from "tesseract.ts";
import { filter } from "rxjs/operators";
import { AppState } from "src/app/app.reducers";
import { getFilesToExtract } from "src/app/store";
import { IFileToExtract } from "src/app/store/extractions/reducers";
import { TryRemoveExtraction, TryPutExtractedFile } from "src/app/store/extractions/actions";
import { Extraction, ExtractionState, IExtractionToFix } from "src/app/models/extraction-state";
import { TryPushNotification } from "src/app/store/notifications/actions";
import { Notification } from '../../../models/notification';
import { ReceiptBase, IReceiptCore, IQuality } from "src/app/services/receipt-base";
@Component({
  selector: 'app-extractions',
  templateUrl: './extractions.component.html',
  styleUrls: ['./extractions.component.scss']
})
export class ExtractionsComponent extends ReceiptBase implements OnInit, OnDestroy {
  statusIcons = {
    error: 'error_outline',
    ok: 'done',
    warn: 'warning'
  };

  constructor(private store: Store<AppState>) { super(); }

  previewOpened = false;
  containsOperations = false;

  readedContents: IExtractionToFix = null;

  extractionsKeys: string[] = [];
  currentExtractions: Extraction = null;
  checkIsTesseractFreezed = interval(5000);
  isFreezed = false;

  filesSubscription: Subscription;
  checkFreezedSubscription: Subscription;
  ngOnInit() {

    this.filesSubscription = this.store.select(getFilesToExtract).pipe(filter(files => files !== null ? true : false))
      .subscribe((files: IFileToExtract) => {
        const filesKeys: string[] = Object.keys(files);
        const filesLength = filesKeys.length;

        if (filesLength === 0) {
          this.previewOpened = false;
          this.containsOperations = false;
          this.checkFreezedSubscription.unsubscribe();
        }
        else if (filesLength > this.extractionsKeys.length) {
          const operationState = new ExtractionState(true, '', 0, 'starting extracing data from file...');
          const operationName = filesKeys[filesLength-1];

          const operation: Extraction = {
            [operationName]: operationState
          };
          this.currentExtractions = { ...this.currentExtractions, ...operation };

          this.previewOpened = true;
          this.containsOperations = true;
          this.convertImageToText(files[operationName], operationName);

          if(!this.checkFreezedSubscription)
            this.checkIsFreezed();
          if(this.checkFreezedSubscription)
            if (this.checkFreezedSubscription.closed)
              this.checkIsFreezed();
        }

        this.extractionsKeys = filesKeys;
      });

  }

  checkIsFreezed() {
    this.checkFreezedSubscription = this.checkIsTesseractFreezed.subscribe(() => {
      const breakValue = 100;
      const breakComunicate = 'initializing api';
      const firstExtractionKey: string = this.extractionsKeys[0];
      const firstExtraction = this.currentExtractions[firstExtractionKey];

      this.isFreezed = (firstExtraction.value === 100 && firstExtraction.finishStatus === '' && firstExtraction.description === breakComunicate) ?
        true : false;
      this.pushFreezeComunicates();
    });
  }

  pushFreezeComunicates() {
    if (this.isFreezed) {
      const currentExtractions: Extraction = {};
      for (let key in this.extractionsKeys) {
        const extKey = this.extractionsKeys[key];
        const extractionState = new ExtractionState(false, 'error', 0, "Reading error. Try again later");
        currentExtractions[extKey] = extractionState;
      }
      this.currentExtractions = currentExtractions;
      this.checkFreezedSubscription.unsubscribe();
      const notification = new Notification('First image must contains text. Reload page and try again.',
        'error', 'tesseract', false);
      this.store.dispatch(new TryPushNotification(notification));
    }
  }

  checkAllExtractionsStatus() {
    let isDone = true;
    for(let key in this.extractionsKeys) {
      const extKey = this.extractionsKeys[key];
      if (this.currentExtractions[extKey].finishStatus === '')
        isDone = false;
    }
    if (isDone) {
      this.checkFreezedSubscription.unsubscribe();
    }
  }

  ngOnDestroy() {
    if (this.filesSubscription) {
      this.filesSubscription.unsubscribe();
    }
    if (this.checkFreezedSubscription) {
      this.checkFreezedSubscription.unsubscribe();
    }
  }

  togle(key: string) {
    this[key] = !this[key];
  }

  handleClose(key: string) {
    this.store.dispatch(new TryRemoveExtraction(key));
  }

  convertImageToText(file: File, key: string) {
    Tesseract.recognize(file, {lang: 'pol'})
    .progress(progress => {
      this.currentExtractions[key] = new ExtractionState(true, '', Math.round(progress.progress * 100), progress.status);
    })
    .finally((response: any) => {
      if (response.text) {

        const lines: string[] = response.lines.map(line => line.text.toLowerCase());
        const coreData: IReceiptCore = super.getCoreReceiptData(lines);
        console.log(lines, coreData);
        if (coreData.receiptTitleIndex && coreData.sellTaxTitleIndex) {

          const cutedLines = super.concatItems(lines, coreData.receiptTitleIndex, coreData.sellTaxTitleIndex);
          const readedContent = {
            [key]: { lines: cutedLines, receiptCoreData: coreData }
          };
          this.readedContents = { ...this.readedContents, ...readedContent };
          const icon = coreData.sum ? 'ok' : 'warn';
          const message = coreData.sum ? `Data has been read successfully` : 'Using in form is risky...';

          this.currentExtractions[key] = new ExtractionState(false, icon, 100, message);
          this.store.dispatch(new TryPutExtractedFile({ text: response.text, key }));
        }
        else {
          this.currentExtractions[key] = new ExtractionState(false, 'error', 100, `Receipt quality is to low`);
        }

      } else {
        this.currentExtractions[key] = new ExtractionState(false, 'error', 0, "Given image doesn't contains words");
      }

      this.checkAllExtractionsStatus();
    })
  }

}
