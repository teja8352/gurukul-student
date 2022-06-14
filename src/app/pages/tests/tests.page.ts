import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Test } from 'src/app/models/course.interface';
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
  }

  ngOnInit() {
  }


  // async openTest(test: Test) {
  //   this.stateService.setData("test", test);
  //   this.commonService.navigateForward("gurukul/courses/test");
  // }

  buyCourse() {
    this.commonService.navigateForward('payment');
  }

}
