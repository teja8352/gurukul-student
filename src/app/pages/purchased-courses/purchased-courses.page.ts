import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Course, Order } from 'src/app/models/course.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonService } from 'src/app/services/common/common.service';
import { StateService } from 'src/app/services/state/state.service';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-purchased-courses',
  templateUrl: './purchased-courses.page.html',
  styleUrls: ['./purchased-courses.page.scss'],
})
export class PurchasedCoursesPage implements OnInit {

  public orders: Order[] = [];
  constructor(
    private dataService: DataService,
    private cd: ChangeDetectorRef,
    private alertCtrl: AlertController,
    private commonService: CommonService,
    private stateService: StateService,
    private authService: AuthService
  ) {
    this.dataService.getPurchasedOrders().subscribe(res => {
      this.orders = res;
      this.cd.detectChanges();
    });
  }

  ngOnInit() {
  }

  openCourse(course: Order) {
    const courseData: Course = {
      id: course?.course_id,
      title: course?.course_name,
      description: course?.course_desc
    };
    this.stateService.setData('course', courseData);
    this.commonService.navigateForward('purchased-tests');
  }
}
