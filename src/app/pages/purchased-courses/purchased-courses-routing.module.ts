import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PurchasedCoursesPage } from './purchased-courses.page';

const routes: Routes = [
  {
    path: '',
    component: PurchasedCoursesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchasedCoursesPageRoutingModule {}
