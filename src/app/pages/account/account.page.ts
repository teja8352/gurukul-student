import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
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

  public student: Student = null;

  constructor(
    private cd: ChangeDetectorRef,
    private dataService: DataService,
    private stateService: StateService,
    private storageService: StorageService,
    private loadingCtrl: LoadingController,
    private commonService: CommonService
  ) {
    this.dataService.getStudentById(localStorage.getItem('student_id') || '').subscribe((resp: any) => {
      this.student = resp;
      this.cd.detectChanges();
    });
  }

  ngOnInit() { }

}
