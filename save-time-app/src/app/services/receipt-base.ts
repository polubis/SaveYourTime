
export class ReceiptBase {
  extractSum(lines: string[]): number {
    const sumRegex = /(sum|pln)[\W\D]*[0-9]+(\W?\D?)[0-9]{2}/;
    let sum: number;
    for (let key in lines) {
      if (sum)
        break;

      const extractedRgx = sumRegex.exec(lines[key]);
      if (extractedRgx) {
        sum = +extractedRgx.input
        .replace(/[a-zA-Z-_@ ]/g, '')
        .replace(/,/, '.')
      }
    }
    return sum;
  }

  findPatternDataInReceipt(lines: string[], patterns: any[]) {
    let index: number;
    for(let i = 0; i < lines.length; i++) {
      if (index) {
        break;
      }
      const text: string = lines[i];
      for(let rx in patterns) {
        const pattern = patterns[rx];
        if (pattern.test(text)){
          index = i;
        }
      }
    }
    return index;
  }

  getCoreReceiptData(lines: string[]): IReceiptCore {
    const sum: number = this.extractSum(lines);
    const receiptTitleIndex: number = this.findPatternDataInReceipt(lines, [/p.{5}n\s/, /n.*e\s?f.{7}/, /f.{6}y/]);
    const sellTaxTitleIndex: number = this.findPatternDataInReceipt(lines, [/(s|ś)prze/]);
    const ratio = this.checkRatio({ sum, receiptTitleIndex, sellTaxTitleIndex });
    return { sum, receiptTitleIndex, sellTaxTitleIndex, ratio };
  }
  checkRatio(receiptCore: IReceiptCore) {
    let ratio = 0;
    if (receiptCore.sum) ratio++;
    if (receiptCore.receiptTitleIndex) ratio++;
    if (receiptCore.sellTaxTitleIndex) ratio++;
    return ratio;
  }
}

export interface IQuality {
  ratio: number;
  isOk: boolean;
}
export interface IReceiptCore {
  sum: number;
  receiptTitleIndex: number;
  sellTaxTitleIndex: number;
  ratio?: number;
}
