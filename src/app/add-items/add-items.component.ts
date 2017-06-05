import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute,  Params} from '@angular/router';
import { Item } from '../models/item';
import { ItemsService } from '../services/items.service';
import { Location } from '@angular/common';
import { Constants } from '../helpers/constants';
import { Helper } from '../helpers/helper';
import { SharedData } from '../services/pass-data.service';



@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css']
})
export class AddItemsComponent implements OnInit {
  types: Array<any>;
  model: Item;
  submitted: boolean;
  value: any = {};
  size: string;
  sizes: Array<any>;
  isEdit: boolean;

  constructor(private itemsService: ItemsService,
      private route: ActivatedRoute,
      private router: Router,
      private sharedData: SharedData,
      private helper: Helper ) {
      }

  ngOnInit() {
    this.types = Constants.TYPES;
    this.sizes = Constants.SIZES;
    this.submitted = false;
    if (!this.sharedData.getCurrentItem()) {
      this.model = new Item('', 0, '');
      this.value = this.types[0];
      this.size = this.sizes[0];
      this.isEdit = false;
    } else {
      this.model = this.sharedData.getCurrentItem();
      this.value = this.model.type;
      this.size = this.helper.setSize(this.model);
      this.isEdit = true;
    }
  }
 
  edit() {
    return this.isEdit ? 'Añadir' : 'Actualizar';
  }
  onSubmit() {
    if(!this.isEdit) {
      this.itemsService.create(this.model)
      .then(() =>  {
        console.info('It was ok!!!');
        this.submitted = true;
        this.goHome();
      });
    } else {
      this.itemsService.update(this.model).then(result => {
        this.sharedData.removeCurrentItem();
        this.goHome();
      });
    }
  }
  newHero() {
    this.model = new Item('', 0, '');
  }

 showSize() {
   return this.model.type === 1;
 }

showQuantity() {
   return this.model.type > 0 && this.model.type < 4;
 }

 showExpirationDate() {
   return this.model.type === 2 || this.model.type === 3;
 }

  goHome(): void {
   this.router.navigate(['/']);
  }
}
