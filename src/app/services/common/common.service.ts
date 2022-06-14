import { Injectable } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { NavigationOptions } from '@ionic/angular/providers/nav-controller';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) { }

  presentToast(message = 'Please wait...', color = 'primary', duration = 3000) {
    this.toastCtrl.create({
      cssClass: '',
      color,
      duration,
      message,
    }).then(toast => {
      toast.present();
    }, err => {
      console.error('Error while toasting message', err);
    });
  }

  getExtension(url: string) {
    let type: string = url.split(/[#?]/)[0].split('.').pop().trim();
    if (['jpg', 'jpeg', 'png', 'gif', 'tiff', 'svg'].includes(type.toLowerCase())) {
      type = 'image';
    } else if (['mp3', 'm4a', 'acc', 'ogg', 'wma', 'flac', 'alac'].includes(type.toLowerCase())) {
      type = 'audio';
    } else if (['3gp', 'mp4', 'mov', 'wmv', 'flv', 'avi', 'avchd', 'webm', 'mkv'].includes(type.toLowerCase())) {
      type = 'video';
    } else if (['zip', 'rar'].includes(type.toLowerCase())) {
      type = 'archive';
    }
    return type.toLowerCase();
  }

  navigateForward(url: string, state: NavigationOptions = {}) {
    this.navCtrl.navigateForward(url, { state: { ...state } });
  }

  navigateBack(url: string, state: NavigationOptions = {}) {
    this.navCtrl.navigateBack(url, { state: { ...state } });
  }

  navigateRoot(url: string, state: NavigationOptions = {}) {
    this.navCtrl.setDirection('root');
    this.navCtrl.navigateRoot(url, { state: { ...state } });
  }
}
