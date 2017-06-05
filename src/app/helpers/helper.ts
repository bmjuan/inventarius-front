import {Item} from '../models/item';
import { Constants } from './constants';
import * as _ from 'lodash';

export class Helper {
    static readonly TYPES = [{value: 1, literal: 'Ropa'},
    {value: 2, literal: 'Medicamentos'},
    {value: 3, literal: 'Comida'},
    {value: 4, literal: 'Otros'}];
    
    static readonly SIZES = [{value: 1, literal: '0 meses'},
    {value: 2, literal: '0-3 meses'},
    {value: 3, literal: '3-6 meses'},
    {value: 4, literal: '6-12 meses'},
    {value: 5, literal: '+1 año'}];

    constructor() {
    };

    setType(items: Array<any>) {
        return _.map(items, this.replaceValue);
    }

     setSize(item: Item) {
        const index = _.findIndex(Constants.SIZES, function(o) { return o.value === item.type; });
        return Constants.SIZES[index].literal;
    }

    private replaceValue(item: Item) {
       const index = _.findIndex(Constants.TYPES, function(o) { return o.value === item.type; });
       item.typeLiteral = Constants.TYPES[index].literal;
       return item;
    }
}
