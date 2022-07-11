import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PurchasedTestsPageRoutingModule } from './purchased-tests-routing.module';

import { PurchasedTestsPage } from './purchased-tests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PurchasedTestsPageRoutingModule
  ],
  declarations: [PurchasedTestsPage]
})
export class PurchasedTestsPageModule {}
