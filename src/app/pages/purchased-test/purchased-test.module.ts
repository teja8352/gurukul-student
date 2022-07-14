import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PurchasedTestPageRoutingModule } from './purchased-test-routing.module';

import { PurchasedTestPage } from './purchased-test.page';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PurchasedTestPageRoutingModule,PdfViewerModule
  ],
  declarations: [PurchasedTestPage]
})
export class PurchasedTestPageModule {}
