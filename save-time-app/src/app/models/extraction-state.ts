
import { IReceiptCore } from "src/app/services/receipt-base";

export class ExtractionState {
  constructor(public isProcessing: boolean, public finishStatus: string,
    public value: number, public description: string) {

  }
}
export interface Extraction {
  [key: string]: ExtractionState;
};

export interface IExtractionToFix {
  [key: string]: {
    lines: string[];
    receiptCoreData: IReceiptCore;
  };
}
