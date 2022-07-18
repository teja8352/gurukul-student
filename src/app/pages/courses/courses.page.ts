/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DocumentReference, DocumentData } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { Course, Order } from 'src/app/models/course.interface';
import { Student } from 'src/app/models/student.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonService } from 'src/app/services/common/common.service';
import { StateService } from 'src/app/services/state/state.service';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {

  public courses: Course[] = [];
  public student: Student;

  constructor(
    private dataService: DataService,
    private cd: ChangeDetectorRef,
    private alertCtrl: AlertController,
    private commonService: CommonService,
    private stateService: StateService,
    private authService: AuthService
  ) {
    this.dataService.getCourses().subscribe(res => {
      this.courses = res;
      this.cd.detectChanges();
    });
    this.dataService.getStudentById(localStorage.getItem('student_id') || '').subscribe((resp: any) => {
      this.student = resp;
      localStorage.setItem('student', JSON.stringify(this.student));
      this.cd.detectChanges();
    });
  }

  ngOnInit() { }

  openCourse(course: Course) {
    this.stateService.setData('course', course);
    this.commonService.navigateForward('tests');
  }

  buyCourse(course: Course) {
    const payload: Order = {
      course_id: course?.id,
      course_name: course?.title,
      course_desc: course?.description,
      student_id: localStorage.getItem('student_id') || this.student.id,
      student_name: this.student.first_name + ' ' + this.student.last_name,
      status: false
    };
    this.dataService.getOrders(payload).then((res: any) => {
      if (res?.size > 0) {
        this.commonService.navigateForward('payment');
      } else {
        this.dataService.addOrder(payload).then((resp: DocumentReference<DocumentData>) => {
          if (resp.id) {
            this.stateService.setData('order_id', resp.id);
            localStorage.setItem('order_id', resp.id);
            this.commonService.navigateForward('payment');
          }
        }, (err: any) => {
          console.error('Error while adding the order:::::\n', err);
          this.commonService.presentToast('Unable to create order', 'danger');
        });
      }
    }, err => {
      console.error('Error while checking the order:::::\n', err);
      this.commonService.presentToast('Unable to check order', 'danger');
    });
  }
}
