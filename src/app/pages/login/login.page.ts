import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonService } from 'src/app/services/common/common.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;
  public isPasswordVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router,
    private dataService: DataService,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['teja@g.co', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required, Validators.minLength(6)]],
    });
  }

  register() {
    this.router.navigateByUrl('/register', { replaceUrl: true });
  }

  async login() {
    const loading = await this.loadingController.create({ message: 'signing' });
    await loading.present();

    this.dataService.getStudent(this.loginForm.value).subscribe(async (resp: any) => {
      await loading.dismiss();
      if (resp.length === 0) {
        this.commonService.presentToast('Invalid credentials', 'danger');
      } else {
        localStorage.setItem('student', JSON.stringify(resp[0]));
        localStorage.setItem('student_id', (resp[0].id));
        this.router.navigateByUrl('dashboard', { replaceUrl: true });
      }
    }, async (err) => {
      console.error('Error while logging::::::::\n', err);
      await loading.dismiss();
      this.showAlert('Login failed', 'Please try again!');
    });
    // const user = await this.authService.login(this.loginForm.value);
    // await loading.dismiss();

    // if (user.code === 'auth/user-not-found') {
    //   this.commonService.presentToast('Email doesn\'t exists with us', 'danger');
    //   return;
    // } else if (user.code === 'auth/wrong-password') {
    //   this.commonService.presentToast('Invalid Password', 'danger');
    //   return;
    // }

    // if (user) {
    //   console.log("user::::::",user,user.user.uid)
    //   localStorage.setItem("uid",user.user.uid)
    //   this.router.navigateByUrl('/dashboard', { replaceUrl: true });
    // } else {
    //   this.showAlert('Login failed', 'Please try again!');
    // }
  }

  showPassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Easy access for form fields
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
