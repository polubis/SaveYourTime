


import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { switchMap, map, take } from "rxjs/operators";
import { AppState } from "src/app/app.reducers";
import * as ExtractionsActions from '../../store/extractions/actions';
import { of } from "rxjs";
import { getFilesToExtract } from "src/app/store";
import { IFileToExtract } from "src/app/store/extractions/reducers";
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
      return this.store.select(getFilesToExtract).pipe(take(1));
    }),
    map((filesToExtract: IFileToExtract) => {
      const cutedFiles: IFileToExtract = {};
      const keys = Object.keys(filesToExtract);
      for(let key in keys) {
        const extFileKey = keys[key];
        if (extFileKey !== this.keyToRemove) {
          cutedFiles[extFileKey] = filesToExtract[extFileKey];
        }
      }
      return {
        type: ExtractionsActions.SET_EXTRACTIONS, payload: cutedFiles
      };
    })
  )

}
