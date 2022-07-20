import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PurchasedTestPageRoutingModule } from './purchased-test-routing.module';

import { PurchasedTestPage } from './purchased-test.page';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { QuillModule } from 'ngx-quill';
import { VideoPlayerPageModule } from 'src/app/video-player/video-player.module';
import { VideoPlayer } from '@awesome-cordova-plugins/video-player/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PurchasedTestPageRoutingModule,
    PdfViewerModule,
    VideoPlayerPageModule,
    QuillModule.forRoot({
      modules: {
        syntax: true
      },
      format: 'html',
      readOnly: true,
      theme: 'snow',
      placeholder: 'EVALUATOR’S REMARKS',
    }),
  ],
  declarations: [PurchasedTestPage],
  providers:[VideoPlayer]

})
export class PurchasedTestPageModule { }
