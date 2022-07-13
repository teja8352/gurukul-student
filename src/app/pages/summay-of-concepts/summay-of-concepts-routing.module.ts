import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SummayOfConceptsPage } from './summay-of-concepts.page';

const routes: Routes = [
  {
    path: '',
    component: SummayOfConceptsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SummayOfConceptsPageRoutingModule {}
