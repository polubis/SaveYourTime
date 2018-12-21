


import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { switchMap, map, take } from "rxjs/operators";
import { AppState } from "src/app/app.reducers";
import * as ExtractionsActions from '../../store/extractions/actions';
import { of } from "rxjs";
import { IFileToExtract, IExtractedFiles } from "src/app/store/extractions/reducers";
@Injectable()
export class ExtractionsEffects {
  keyToRemove: string;
  constructor(
    private actions$: Actions,
    private store: Store<AppState>
  ) {}

  @Effect()
  tryPutExtraction = this.actions$.ofType(ExtractionsActions.TRY_PUT_EXTRACTION).pipe(
    switchMap((action: ExtractionsActions.TryPutExtraction) => {
      const fileToExtract: IFileToExtract = {
        [action.payload.name]: action.payload
      };
      return of(fileToExtract);
    }),
    map((extractedFiles: IFileToExtract) => {
        return {
          type: ExtractionsActions.PUT_EXTRACTION, payload: extractedFiles
        };
    })
  )

  @Effect()
  tryRemoveExtraction = this.actions$.ofType(ExtractionsActions.TRY_REMOVE_EXTRACTION).pipe(
    switchMap((action: ExtractionsActions.TryRemoveExtraction) => {
      this.keyToRemove = action.payload;
      return this.store.select(state => state.extractions).pipe(take(1));
    }),
    map((state: {filesToExtract: IFileToExtract, extractedFiles: IExtractedFiles}) => {
      const filesToExtract = {...state.filesToExtract};
      const extractedFiles = {...state.extractedFiles};

      delete filesToExtract[this.keyToRemove];
      delete extractedFiles[this.keyToRemove];
      return {
        type: ExtractionsActions.SET_EXTRACTIONS, payload: {filesToExtract, extractedFiles}
      };
    })
  )

  @Effect()
  tryPutExtractedFile = this.actions$.ofType(ExtractionsActions.TRY_PUT_EXTRACTED_FILE).pipe(
    switchMap((action: ExtractionsActions.TryPutExtractedFile) => {
      const extractedFile: IExtractedFiles = {
        [action.payload.key]: action.payload.text
      };
      return of(extractedFile);
    }),
    map((extractedFile: IExtractedFiles) => {
      return {
        type: ExtractionsActions.PUT_EXTRACTED_FILE, payload: extractedFile
      };
    })
  )

}
