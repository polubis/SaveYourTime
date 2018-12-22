
export class ReceiptBase {
  matches: IMatch = {
    receipt: new Match(
      ['suma', 'gotówka', 'reszta', 'sprzedaż', 'nip', 'paragon fiskalny'],
      ['suma', 'gotówka', 'reszta', 'sprzedaż'],
    )
  };

  receipt

  extractSumLine(text: string): number {
    const sumRegex = /(su|pln)\w*\s*(\d*(\D|\W|)\s*\d{2})/;
    const extractedRgx = sumRegex.exec(text);
    // poprawic ten regex zeby ten 1 przypadek ogarnialo
    if(extractedRgx){
      console.log(extractedRgx, +extractedRgx[2].replace(/,/, '.'));

    }
    return extractedRgx ? +extractedRgx[2].replace(/\D|\W/, '.') : null;
  }

  extractCoreReceiptData(lines: string[]) {
    let sum: number;
    let rest: number;
    let cash: number;
    const linesCount = lines.length;
    for (let i = 0; i < linesCount; i++) {
      if (!sum) {
        sum = this.extractSumLine(lines[i]);
      }
    }
  }




  checkQualityOfExtractedImage(lines: string[], matchName: string): IQuality{
    const linesCount = lines.length;
    const match: Match = this.matches[matchName];
    const regexPatterns = this.createRegexPatterns(match.matchDictionary);
    const patternsKeys = Object.keys(regexPatterns);
    let currentMatchRatio = 0;

    for (let key in patternsKeys) {
      const name: string = patternsKeys[key];

      for(let i = 0; i < linesCount; i++) {
        const text: string = lines[i];
        const result = regexPatterns[name].test(text);
        if(result) {
          currentMatchRatio += match.jumpRatio
          break;
        }
      }
    }
    return { ratio: currentMatchRatio, isOk: currentMatchRatio > match.minimumMatchRate };
  }

  createRegexPatterns(dictionary: string[]) {
    const regexes: {[key: string]: any} = {};
    for(let key in dictionary) {
      regexes[dictionary[key]] = this.createWordInTextRgx(dictionary[key]);
    }
    return regexes;
  }

  createWordInTextRgx(baseValue: any) {
    const baseValLength = baseValue.length;
    let expression = `${baseValue}`;
    let currentSlice = '';
    const sliceLimit = 3;
    if (baseValLength > sliceLimit) {
      for(let i = 0; i < baseValLength; i++) {
        if (currentSlice.length === sliceLimit)
          break;

        currentSlice = baseValue.slice(0, baseValLength-1-i);
        expression += `|${currentSlice}`;
      }
    }

    return new RegExp(expression);
  }
}

export class Match {
  constructor(public matchDictionary: string[], public informationsDictionary: string[], public minimumMatchRate: number = 25, additionalRegexes?: any, public jumpRatio?: number) {
    const jump = 100 / matchDictionary.length;
    this.jumpRatio = Math.round(jump * 100) / 100;
  }
}
export interface IMatch {
  [key: string]: Match;
}

export interface IQuality {
  ratio: number;
  isOk: boolean;
}
