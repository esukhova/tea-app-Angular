import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textCut'
})
export class TextCutPipe implements PipeTransform {

  transform(text: string, numberOfCharacters: number): string {
    return text.length > numberOfCharacters ? text.slice(0, numberOfCharacters) + '...' : text;
  }
}
