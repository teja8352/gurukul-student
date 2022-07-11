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

  constructor(
    private commonService: CommonService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  navTo(path: string) {
    this.commonService.navigateForward(path);
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }, err => {
      console.error('Error while logout:::::::\n', err);
    });
  }
}
