import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'id'
})
export class IdPipe implements PipeTransform {

  transform(id: string): string {
    return `<div class="pipe-layout"><div class="light">${id[0]}</div><div class="bold">${id.slice(1)}</div></div>`;
  }

}
