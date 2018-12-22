


import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'shorten'
})
export class TextPipe implements PipeTransform {
  transform(value: any, limit: number = 20) {
    if (value.length > limit) {
      return value.substring(0, limit) + "...";
    }
    else{
      return value;
    }
  }
}
