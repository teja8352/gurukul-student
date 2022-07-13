import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SummayOfConceptsPageRoutingModule } from './summay-of-concepts-routing.module';

import { SummayOfConceptsPage } from './summay-of-concepts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SummayOfConceptsPageRoutingModule
  ],
  declarations: [SummayOfConceptsPage]
})
export class SummayOfConceptsPageModule {}
