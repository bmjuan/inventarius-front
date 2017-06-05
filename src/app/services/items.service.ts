import {ViewContainerRef, Injectable} from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Item } from '../models/item';
import { DataTableParams } from 'angular-2-data-table';

function paramsToQueryString(params: DataTableParams) {
    let result = [];

    if (params.offset != null) {
        result.push(['_start', params.offset]);
    }
    if (params.limit != null) {
        result.push(['_limit', params.limit]);
    }
    if (params.sortBy != null) {
        result.push(['_sort', params.sortBy]);
    }
    if (params.sortAsc != null) {
        result.push(['_order', params.sortAsc ? 'ASC' : 'DESC']);
    }

    return result.map(param => param.join('=')).join('&');
}

@Injectable()
export class ItemsService {

  private headers = new Headers({'Content-Type': 'application/json'});
  //private itemsUrl = 'http://192.168.1.136:6639/api/items';  // URL to web api
  private itemsUrl = 'http://inventarius.azurewebsites.net/api/items';
    
  constructor(private http: Http) { }
  getItems(params: DataTableParams) {
      //+ '?' + paramsToQueryString(params)
         return this.http.get(this.itemsUrl)
               .toPromise()
               .then(response =>  response.json()
               ).catch(this.handleError);
    }
  getItem(id: number): Promise<Item> {
    const url = `${this.itemsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Item)
      .catch(this.handleError);
  }
  delete(id: number): Promise<void> {
    const url = `${this.itemsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
  create(item: Item): Promise<Item> {
    return this.http
      .post(this.itemsUrl, JSON.stringify(item), {headers: this.headers})
      .toPromise()
      .then(res => null)
      .catch(this.handleError);
  }
  update(Item: Item): Promise<Item> {
    const url = `${this.itemsUrl}/${Item.id}`;
    return this.http
      .put(url, JSON.stringify(Item), {headers: this.headers})
      .toPromise()
      .then(() => Item)
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
