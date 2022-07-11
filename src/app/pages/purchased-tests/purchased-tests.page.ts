/* eslint-disable @typescript-eslint/naming-convention */
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DocumentReference, DocumentData } from '@angular/fire/firestore';
import { Course, Order, Test } from 'src/app/models/course.interface';
import { CommonService } from 'src/app/services/common/common.service';
import { DataService } from 'src/app/services/data/data.service';
import { StateService } from 'src/app/services/state/state.service';

@Component({
  selector: 'app-purchased-tests',
  templateUrl: './purchased-tests.page.html',
  styleUrls: ['./purchased-tests.page.scss'],
})
export class PurchasedTestsPage implements OnInit {

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

  ngOnInit() { }

  openTest(test: Test) {
    this.stateService.setData('test', test);
    this.commonService.navigateForward('test');
  }
}
