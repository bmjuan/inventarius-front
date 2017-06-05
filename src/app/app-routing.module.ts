import { AddItemsComponent } from './add-items/add-items.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
  { path: 'addItem', component: AddItemsComponent },
  { path: 'items/:id', component: ItemDetailComponent },
  { path: 'home', component: ItemsListComponent},
  {
    path: 'home',
    component: ItemsListComponent,
    data: { title: 'Home' }
  },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}