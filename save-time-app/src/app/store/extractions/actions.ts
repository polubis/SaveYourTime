import { Action } from "@ngrx/store";
import { IFileToExtract, IExtractedFiles } from "src/app/store/extractions/reducers";

export const TRY_PUT_EXTRACTED_FILE = "[Extractions] TRY_PUT_EXTRACTED_FILE";
export const PUT_EXTRACTED_FILE = "[Extractions] PUT_EXTRACTED_FILE";

export const TRY_PUT_EXTRACTION = "[Extractions] TRY_PUT_EXTRACTION";
export const PUT_EXTRACTION = "[Extractions] PUT_EXTRACTION";
export const TRY_REMOVE_EXTRACTION = "[Extractions] TRY_REMOVE_EXTRACTION";
export const SET_EXTRACTIONS = "[Extractions] SET_EXTRACTIONS";

export class TryPutExtractedFile {
  readonly type = TRY_PUT_EXTRACTED_FILE;
  constructor(public payload: {text: string, key: string}) {}
}

export class PutExtractedFile {
  readonly type = PUT_EXTRACTED_FILE;
  constructor(public payload: IExtractedFiles) {}
}

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
  constructor(public payload: {filesToExtract: IFileToExtract, extractedFiles: IExtractedFiles}) {}
}

export class TryRemoveExtraction {
  readonly type = TRY_REMOVE_EXTRACTION;
  constructor(public payload: string) {}
}

export type ExtractionsActions = TryPutExtraction | PutExtraction | SetExtractions | TryRemoveExtraction | TryPutExtractedFile | PutExtractedFile;
