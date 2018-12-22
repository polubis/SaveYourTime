
export class ExtractionState {
  constructor(public isProcessing: boolean, public finishStatus: string,
    public value: number, public description: string, public extractionOnErrorOverview?: string) {

  }
}
export interface Extraction {
  [key: string]: ExtractionState;
};
