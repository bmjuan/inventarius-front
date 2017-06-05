import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AddItemsComponent } from './add-items/add-items.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { ItemsService } from './services/items.service';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { SidebarModule } from 'ng-sidebar';
import { DataTableModule } from 'angular-2-data-table';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { SharedData } from './services/pass-data.service';
import { Helper } from './helpers/helper';


@NgModule({
  declarations: [
    AppComponent,
    AddItemsComponent,
    ItemsListComponent,
    PageNotFoundComponent,
    ItemDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    DatepickerModule.forRoot(),
    SidebarModule.forRoot(),
    DataTableModule,
    Angular2FontawesomeModule
  ],
  providers: [ItemsService, SharedData, Helper],
  bootstrap: [AppComponent]
})
export class AppModule { }
