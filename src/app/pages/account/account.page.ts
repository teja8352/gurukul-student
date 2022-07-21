import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { FirebaseCollections } from 'src/app/constants/fb-collections';
import { Student } from 'src/app/models/student.interface';
import { CommonService } from 'src/app/services/common/common.service';
import { DataService } from 'src/app/services/data/data.service';
import { StateService } from 'src/app/services/state/state.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  public studentForm: FormGroup;
  public studentId: string = "";
  public customActionSheetOptions: any = {
    header: 'Select course type'
  };

  constructor(
    private cd: ChangeDetectorRef,
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
    this.dataService.getStudentById(localStorage.getItem('student_id') || '').subscribe((resp: any) => {
      this.studentForm.patchValue(resp);
      this.studentId = resp.id;
      this.cd.detectChanges();
    });
  }

  ngOnInit() { }

  createForm() {
    this.studentForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      first_name: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      last_name: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      mobile: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      course_type: [null, Validators.required],
      dob: [null, Validators.required],
      location: this.formBuilder.group({
        address: [null, Validators.required],
        pincode: [null, Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required],
        country: ['India', Validators.required],
      })
    });
  }

  update() {
    this.dataService.update(FirebaseCollections.STUDENTS, { ...this.studentForm.value, id: this.studentId }).then(resp => {
      this.dataService.getStudentById(localStorage.getItem('student_id') || '').subscribe((res: any) => {
        this.studentForm.patchValue(res);
        this.studentId = res.id;
      });
    }, err => {
      console.error('Error while updating profile::::::\n', err);
    });
  }

  // Easy access for form fields
  get email() {
    return this.studentForm.get('email');
  }

  get password() {
    return this.studentForm.get('password');
  }

  get first_name() {
    return this.studentForm.get('first_name');
  }

  get last_name() {
    return this.studentForm.get('last_name');
  }
  get mobile() {
    return this.studentForm.get('mobile');
  }
  get dob() {
    return this.studentForm.get('dob');
  }
  get course_type() {
    return this.studentForm.get('course_type');
  }

  get address() {
    return this.studentForm.get('location.address');
  }

  get pincode() {
    return this.studentForm.get('location.pincode');
  }
  get city() {
    return this.studentForm.get('location.city');
  }
  get state() {
    return this.studentForm.get('location.state');
  }
  get country() {
    return this.studentForm.get('location.country');
  }
}
