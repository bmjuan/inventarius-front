import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../services/items.service';
import { DataTableResource } from 'angular-2-data-table';
import { Constants } from '../helpers/constants';
import { Helper } from '../helpers/helper';
import { SharedData } from '../services/pass-data.service';
@Component({
  selector: 'app-items-list',
  providers: [ItemsService],
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {
  items = [];
  itemCount = 0;

  constructor(private itemsService: ItemsService,
      private route: ActivatedRoute,
      private router: Router,
      private helper: Helper,
      private sharedData: SharedData
      ) { 
      }

    ngOnInit() {
     this.loadItems({});
    }

    loadItems(params) {
      this.itemsService.getItems(params).then(result => {
            this.items = this.helper.setType(result);
            this.itemCount = result.length;
            });
    }

    reloadItems(params) {
     this.loadItems(params);
    }
    editItem(item) {
        this.sharedData.setCurrentItem(item);    
        this.router.navigate(['/addItem']);
    }

   removeItem(item) {
        alert('Remove Item ');
        this.itemsService.delete(item).then(result => {
               this.loadItems({});
            });
    }

    annadirItem() {
        alert('Add Item ');
        this.router.navigate(['/addItem']);
    }
    rowDoubleClick(rowEvent) {
        alert('Double clicked: ' + rowEvent.row.item.name);
        this.router.navigate(['/items', rowEvent.row.item.id]);
    }

    rowTooltip(item) { return item.type; }
}
