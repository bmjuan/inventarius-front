import { Injectable, Component } from '@angular/core';
import { Item } from '../models/item';

@Injectable()
export class SharedData {
  sharedItem: Item;

  setCurrentItem(item: Item) {
      this.sharedItem = item;
  }

  getCurrentItem() {
      return this.sharedItem;
  }

  removeCurrentItem() {
      this.sharedItem = null;
  }
}