import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'id'
})
export class IdPipe implements PipeTransform {

  transform(id: string): string {
    return `<small>${id[0]}</small><strong>${id.slice(1)}</strong>`;
  }

}
