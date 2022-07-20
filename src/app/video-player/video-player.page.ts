import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
 import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.page.html',
  styleUrls: ['./video-player.page.scss'],
})
export class VideoPlayerPage implements OnInit {

  public file: any = null;

  constructor(
    public viewCtrl: ModalController,
    private navParams: NavParams,
    private screenOrientation: ScreenOrientation
  ) {
    this.file = this.navParams.get('file');
    console.log("file::::::::",this.file)
  }

  ngOnInit() {
   
  }
  ionViewWillEnter(){
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }

  dismiss() {
    this.viewCtrl.dismiss();
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }
}
