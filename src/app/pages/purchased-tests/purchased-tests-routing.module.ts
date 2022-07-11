import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PurchasedTestsPage } from './purchased-tests.page';

const routes: Routes = [
  {
    path: '',
    component: PurchasedTestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchasedTestsPageRoutingModule {}
