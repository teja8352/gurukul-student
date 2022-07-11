/* eslint-disable @typescript-eslint/naming-convention */
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DocumentReference, DocumentData } from '@angular/fire/firestore';
import { Course, Order, Test } from 'src/app/models/course.interface';
import { Student } from 'src/app/models/student.interface';
import { CommonService } from 'src/app/services/common/common.service';
import { DataService } from 'src/app/services/data/data.service';
import { StateService } from 'src/app/services/state/state.service';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.page.html',
  styleUrls: ['./tests.page.scss'],
})
export class TestsPage implements OnInit {

  public tests: Test[] = [];
  public student: Student;

  constructor(
    private dataService: DataService,
    private cd: ChangeDetectorRef,
    private commonService: CommonService,
    private stateService: StateService
  ) {
    this.dataService.getTests(this.stateService.getData('course')?.id || '').subscribe(res => {
      this.tests = res;
      this.cd.detectChanges();
    });
    this.dataService.getStudentById(localStorage.getItem('uid') || '').subscribe((resp: any) => {
      this.student = resp[0];
      localStorage.setItem('student', JSON.stringify(this.student));
      this.cd.detectChanges();
    });
  }

  ngOnInit() { }

  buyCourse() {
    const course: Course = this.stateService.getData('course') || {};
    const payload: Order = {
      course_id: course?.id,
      course_name: course?.title,
      course_desc: course?.description,
      student_id: localStorage.getItem('uid'),
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
            this.commonService.navigateForward('payment');
          }
        }, err => {
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
