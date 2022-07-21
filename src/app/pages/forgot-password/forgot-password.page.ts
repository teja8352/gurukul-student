import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonService } from 'src/app/services/common/common.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  public forgotPasswd: FormGroup;
  public isPasswordVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router,
    private dataService: DataService,
    private commonService: CommonService
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.forgotPasswd = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirm_password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  submit() {
    const body = { ...this.forgotPasswd.value };
    if (body.password !== body.confirm_password) {
      this.showAlert('Invalid password', 'Confirm Password doesn\'t match with the password');
      return;
    }

    this.dataService.checkStudent(body.email).subscribe(resp => {
      if (resp.length > 0) {
        delete body.confirm_password;
        delete body.email;
        this.dataService.updateStudent({ ...body, id: resp[0].id }).then(res => {
          this.commonService.presentToast('Password updated successfully.');
        }, err => {
          console.error('Error while updating password:::::::::::\n', err);
          this.showAlert('', 'Unable to update password.');
        });
      } else {
        this.showAlert('Invalid user', 'Unable to update password.');
      }
    }, err => {
      console.error('Error while checking the student::::::::::\n', err);
    });
  }

  cancel() {
    this.router.navigateByUrl('login', { replaceUrl: true });
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
    return this.forgotPasswd.get('email');
  }

  get password() {
    return this.forgotPasswd.get('password');
  }

  get confirmPassword() {
    return this.forgotPasswd.get('confirm_password');
  }

}
