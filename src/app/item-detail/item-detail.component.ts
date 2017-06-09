import { Component, OnInit } from '@angular/core';
import { SharedData } from '../services/pass-data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
  model: any;
  data: any;
  constructor(private route: ActivatedRoute,
      private router: Router,
      private sharedData: SharedData) {
        this.model = this.sharedData.getCurrentItem();
      }

  ngOnInit() {
    this.data = this.responseHanlder(this.model);
  }

 capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
 }

 responseHanlder(res) {
    const data = [];

    // tslint:disable-next-line:forin
    for (let key in res) {
      if(key !== '_Id' && key !== 'type' ) {
        data.push({
            key: this.capitalizeFirstLetter(key),
            value: res[key]
        });
      }
    }
    return data;
  }
  goToEdit() {
    this.sharedData.setCurrentItem(this.model);
    return this.router.navigate(['/addItem']);
  }

   goBack() {
    this.router.navigate(['/home']);
  }
}
