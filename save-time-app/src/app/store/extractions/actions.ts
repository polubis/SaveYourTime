import { Action } from "@ngrx/store";
import { IFileToExtract } from "src/app/store/extractions/reducers";


export const TRY_PUT_EXTRACTION = "[Operations] TRY_PUT_EXTRACTION";
export const PUT_EXTRACTION = "[Operations] PUT_EXTRACTION";
export const TRY_REMOVE_EXTRACTION = "[Operations] TRY_REMOVE_EXTRACTION";
export const SET_EXTRACTIONS = "[Operations] SET_EXTRACTIONS";

export class TryPutExtraction {
  readonly type = TRY_PUT_EXTRACTION;
  constructor(public payload: File) {
  }
}

export class PutExtraction {
  readonly type = PUT_EXTRACTION;
  constructor(public payload: IFileToExtract) {
  }
}

export class SetExtractions {
  readonly type = SET_EXTRACTIONS;
  constructor(public payload: IFileToExtract) {}
}

export class TryRemoveExtraction {
  readonly type = TRY_REMOVE_EXTRACTION;
  constructor(public payload: string) {}
}

export type ExtractionsActions = TryPutExtraction | PutExtraction | SetExtractions | TryRemoveExtraction;
