import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'dataFilter'
})
export class DataFilterPipe implements PipeTransform {

  transform(array: any[], query: string): any {
   
      if (query) {
         console.info('query ' + query);
          const filtered = _.filter(array, row=>row.name.indexOf(query) > -1);
          console.info(filtered);
          return filtered;
      } 
      return array;
  }

}