import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ReplaceMiddelwarePathPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'replaceMiddelwarePath',
})
export class ReplaceMiddelwarePathPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string): string {
    return value.replace("/var/www/html", 'http://52.183.252.65');
  }
}
