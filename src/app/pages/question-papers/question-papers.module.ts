import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionPapersPageRoutingModule } from './question-papers-routing.module';

import { QuestionPapersPage } from './question-papers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionPapersPageRoutingModule
  ],
  declarations: [QuestionPapersPage]
})
export class QuestionPapersPageModule {}
