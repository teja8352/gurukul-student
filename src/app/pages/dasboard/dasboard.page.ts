import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonService } from 'src/app/services/common/common.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.page.html',
  styleUrls: ['./dasboard.page.scss'],
})
export class DasboardPage implements OnInit {

  public student: any = {};

  constructor(
    private commonService: CommonService,
    private authService: AuthService,
    private router: Router,
    private iab: InAppBrowser
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.student = JSON.parse(localStorage.getItem('student'));
  }

  openLink() {
    const browser = this.iab.create('http://www.gurukulforca.com', '_blank');

    browser.on('loadstop').subscribe(event => {
      //
    });

    browser.close();
  }

  navTo(path: string) {
    this.commonService.navigateForward(path);
  }

  logout() {
    this.authService.logout().then(resp => {
      localStorage.clear();
      this.router.navigateByUrl('login', { replaceUrl: true });
    }, err => {
      console.error('Error while logout:::::::::\n', err);
      this.commonService.presentToast('Unable to logout', 'danger');
    });
  }
}
