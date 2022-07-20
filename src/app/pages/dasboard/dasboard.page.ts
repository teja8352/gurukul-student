import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonService } from 'src/app/services/common/common.service';

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
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.student =JSON.parse(localStorage.getItem('student'));
    console.log(this.student)
  }

  navTo(path: string) {
    this.commonService.navigateForward(path);
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('login', { replaceUrl: true });
  }
}
