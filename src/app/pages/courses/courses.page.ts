import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Course } from 'src/app/models/course.interface';
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
  }

  ngOnInit() {
  }

  openCourse(course: Course) {
    this.stateService.setData('course', course);
    this.commonService.navigateForward('tests');
  }

}
