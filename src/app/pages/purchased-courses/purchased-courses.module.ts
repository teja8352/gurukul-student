import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PurchasedCoursesPageRoutingModule } from './purchased-courses-routing.module';

import { PurchasedCoursesPage } from './purchased-courses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PurchasedCoursesPageRoutingModule
  ],
  declarations: [PurchasedCoursesPage]
})
export class PurchasedCoursesPageModule {}
