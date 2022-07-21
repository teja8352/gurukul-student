import { Component, OnInit } from '@angular/core';
import { DocumentReference, DocumentData } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public registerForm: FormGroup;

  public customActionSheetOptions: any = {
    header: 'Select course type'
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      first_name: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      last_name: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      mobile: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      course_type: [null, Validators.required],
      dob: [null, Validators.required],
      location: this.fb.group({
        address: [null, Validators.required],
        pincode: [null, Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required],
        country: ['India', Validators.required],
      })
    });
  }

  async register() {
    const loading = await this.loadingController.create();
    await loading.present();

    const { email, password } = this.registerForm.value;
    const user: any = await this.authService.register({ email, password });
    await loading.dismiss();

    if (user && user?.user?.uid) {
      this.dataService.addStudent({ ...this.registerForm.value, uid: user?.user?.uid }).then((resp: DocumentReference<DocumentData>) => {
        if (resp.id) {
          this.registerForm.reset();
          this.router.navigateByUrl('/login', { replaceUrl: true });
        }
      }, err => {
        console.error('Error while adding the student:::::\n', err);
      });
    } else {
      console.error('Registration failed:::::::::::::\n', user);
      if (JSON.stringify(user) === '{}') {
        this.showAlert('Email ID already exists', 'Please try again with another email');
      } else {
        this.showAlert('Registration failed', 'Please try again!');
      }
    }
  }

  login() {
    this.router.navigateByUrl('/login', { replaceUrl: true });
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
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get first_name() {
    return this.registerForm.get('first_name');
  }

  get last_name() {
    return this.registerForm.get('last_name');
  }
  get mobile() {
    return this.registerForm.get('mobile');
  }
  get dob() {
    return this.registerForm.get('dob');
  }
  get course_type() {
    return this.registerForm.get('course_type');
  }

  get address() {
    return this.registerForm.get('location.address');
  }

  get pincode() {
    return this.registerForm.get('location.pincode');
  }
  get city() {
    return this.registerForm.get('location.city');
  }
  get state() {
    return this.registerForm.get('location.state');
  }
  get country() {
    return this.registerForm.get('location.country');
  }
}
