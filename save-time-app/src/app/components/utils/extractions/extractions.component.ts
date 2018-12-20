import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { Tesseract } from "tesseract.ts";
import { filter } from "rxjs/operators";
import { AppState } from "src/app/app.reducers";
import { getFilesToExtract } from "src/app/store";
import { IFileToExtract } from "src/app/store/extractions/reducers";
import { TryRemoveExtraction, TryPutExtractedFile } from "src/app/store/extractions/actions";
import { Extraction, ExtractionState } from "src/app/models/extraction-state";
@Component({
  selector: 'app-extractions',
  templateUrl: './extractions.component.html',
  styleUrls: ['./extractions.component.scss']
})
export class ExtractionsComponent implements OnInit, OnDestroy {
  statusIcons = {
    error: 'error_outline',
    ok: 'done'
  };

  constructor(private store: Store<AppState>) { }

  previewOpened = false;
  containsOperations = false;

  extractionsKeys: string[] = [];
  currentExtractions: Extraction = null;

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
        }

        this.extractionsKeys = filesKeys;
      });
  }

  ngOnDestroy() {
    this.filesSubscription.unsubscribe();
  }

  togle(key: string) {
    this[key] = !this[key];
  }

  handleCloseAndDeny(key: string) {
    this.store.dispatch(new TryRemoveExtraction(key));
  }

  convertImageToText(file: File, key: string) {
    Tesseract.recognize(file, {lang: 'pol'})
    .progress(progress => {
      this.currentExtractions[key] = new ExtractionState(true, '', Math.round(progress.progress * 100), progress.status);
    }).catch(error => {
      if (error) {
        console.log("Siema");
      }
    })
    .finally((response: any) => {
      if (response.text) {
        this.currentExtractions[key] = new ExtractionState(false, 'ok', 100, 'succesfully extracted');
        this.store.dispatch(new TryPutExtractedFile({ text: response.text, key }));
      } else {
        this.currentExtractions[key] = new ExtractionState(false, 'error', 0, "Given image doesn't contains words");
      }
    })
  }
}
