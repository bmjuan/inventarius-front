import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../services/items.service';
import { DataTableResource } from 'angular-2-data-table';
import { Constants } from '../helpers/constants';
import { Helper } from '../helpers/helper';
import { SharedData } from '../services/pass-data.service';
import { DialogService } from 'ng2-bootstrap-modal';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-items-list',
  providers: [ItemsService],
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {
  items = [];
  itemCount: number;
  filterQuery:string;
  rowsOnPage:number;
  sortBy:string;
  sortOrder:string;

  constructor(private itemsService: ItemsService,
      private route: ActivatedRoute,
      private router: Router,
      private helper: Helper,
      private sharedData: SharedData,
      private dialogService: DialogService
      ) {
          this.sharedData.removeCurrentItem();
      }

    ngOnInit() {
        this.itemCount = 0;
        this.filterQuery = '';
        this.rowsOnPage = 5;
        this.sortBy = 'name';
        this.sortOrder = 'asc';
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
        this.showConfirm(item);
    }

    annadirItem() {
        this.router.navigate(['/addItem']);
    }

    detailItem(item) {
        this.sharedData.setCurrentItem(item);
        this.router.navigate(['/items', item.id]);
    }

    toInt(num: string) {
        return +num;
    }


    rowTooltip(item) { return item.type; }

    showConfirm(item) {
        let disposable = this.dialogService.addDialog(ConfirmDialogComponent, {
            title: 'Eliminar',
            message: '¿Estás seguro de querer eliminar este elemento?'})
            .subscribe((isConfirmed)=>{
                //We get dialog result
                if(isConfirmed) {
                    alert('accepted');
                    this.itemsService.delete(item.id).then(result => {
                        this.loadItems({});
                    });
                }
            });
    }
}
