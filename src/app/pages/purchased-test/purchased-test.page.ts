import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import * as saveAs from 'file-saver';
import { Test } from 'src/app/models/course.interface';
import { CommonService } from 'src/app/services/common/common.service';
import { DataService } from 'src/app/services/data/data.service';
import { StateService } from 'src/app/services/state/state.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-purchased-test',
  templateUrl: './purchased-test.page.html',
  styleUrls: ['./purchased-test.page.scss'],
})
export class PurchasedTestPage implements OnInit {

  public test: Test = null;
  private courseId: string;
  private testId: string;
  public segment: string = 'schedule';
  private audio: HTMLAudioElement;
  public schedule: any = null;
  public questionPaper: any = null;
  public isAudioPlaying: boolean = true;
  public zoom: number = 1;

  constructor(
    private cd: ChangeDetectorRef,
    private dataService: DataService,
    private stateService: StateService,
    private storageService: StorageService,
    private loadingCtrl: LoadingController,
    private commonService: CommonService
  ) {
    // this.courseId = this.stateService.getData('course')?.id || 'MXjcmrbvH9fKCd62NMd0';
    // this.testId = this.stateService.getData('test')?.id || '2zVzaq6HimnRKycKiNW9';
    // this.dataService.getTestById(this.testId).subscribe((resp: any) => {
    //   this.test = resp;
    //   this.cd.detectChanges();
    // });
    // this.dataService.getScheduleByTestId(this.testId).subscribe((resp: any) => {
    //   this.schedule = resp[0];
    //   this.zoom = this.segment === 'schedule' ? 1 : this.zoom;
    //   this.cd.detectChanges();
    // });
    // this.dataService.getQuestionPaperByTestId(this.testId).subscribe((resp: any) => {
    //   this.questionPaper = resp[0];
    //   this.zoom = this.segment === 'question-papers' ? 1 : this.zoom;
    //   this.cd.detectChanges();
    // });
  }

  ngOnInit() { }

  segmentChanged(event: any) {
    console.log(event);
    // this.segment = event?.detail?.value;
  }

  playAudio(url: string) {
    console.log(this.audio.canPlayType);
    this.audio = new Audio(url);
    // if(this.audio.canPlayType)
  }

  playVideo(url: string) {
    //
  }

  download(file: any) {
    saveAs(file.file_url, file.name);
  }

  async uploadReview(event: any, student: any) {
    // const selectedFile: any = event.target.files[0];
    // const loading = await this.loadingCtrl.create({ message: 'Uploading review' });
    // loading.present();
    // const file = {
    //   file: selectedFile,
    //   name: selectedFile.name
    // };
    // const upload: any = await this.storageService.uploadReview(file);
    // if (upload && upload.file_url) {
    //   if (this.test.reviews && this.test.reviews.length > 0) {
    //     this.test.reviews.push({
    //       file_url: upload.file_url,
    //       type: this.commonService.getExtension(selectedFile.name),
    //       name: selectedFile.name,
    //       student_id: student.student_id,
    //       student_name: student.student_name
    //     });
    //   } else {
    //     this.test.reviews = [{
    //       file_url: upload.file_url,
    //       type: this.commonService.getExtension(selectedFile.name),
    //       name: selectedFile.name,
    //       student_id: student.student_id,
    //       student_name: student.student_name
    //     }];
    //   }
    //   await this.dataService.updateTest(this.test);
    //   loading.dismiss();
    // } else {
    //   console.error('Error while uploading file:::::::::::\n', upload);
    //   loading.dismiss();
    // }
  }

  async uploadSchedule(event: any) {
    // const selectedFile: any = event.target.files[0];
    // const loading = await this.loadingCtrl.create({ message: 'Uploading schedule' });
    // loading.present();
    // try {
    //   const file = {
    //     file: selectedFile,
    //     name: this.courseId + '_G_' + this.testId + '_G_' + selectedFile.name,
    //     test_id: this.testId
    //   };
    //   const upload: any = await this.storageService.pushFileToStorage(file, `uploads/schedule/${file.name}`);
    //   if (upload && upload.file_url) {
    //     const schedule: any = {
    //       file_url: upload.file_url,
    //       type: this.commonService.getExtension(selectedFile.name),
    //       name: selectedFile.name,
    //       test_id: this.testId,
    //     };
    //     if (this.commonService.isValidData(this.schedule?.id)) {
    //       schedule.id = this.schedule.id;
    //     }
    //     this.dataService.update(FirebaseCollections.SCHEDULES, schedule).then((resp: any) => {
    //       // console.log('resp::::::::::::\n', resp);
    //       loading.dismiss();
    //     }, err => {
    //       loading.dismiss();
    //       console.error('Error while uploading schdule:::::::::::\n', { ...err });
    //       if (err.code === 'not-found' || err.code === 'invalid-argument') {
    //         this.dataService.add(FirebaseCollections.SCHEDULES, schedule).then((resp: any) => {
    //           // console.log(resp);
    //           this.dataService.getScheduleByTestId(this.testId).subscribe((response: any) => {
    //             this.schedule = response[0];
    //           });
    //         }, (error: any) => {
    //           console.error('Error while adding schdule:::::::::::\n', error);
    //         });
    //       }
    //     });
    //   } else {
    //     console.error('Error while uploading schdule:::::::::::\n', upload);
    //     loading.dismiss();
    //   }
    // } catch (exception: any) {
    //   console.error('Exception while uploading schdule:::::::::::\n', exception, { ...exception });
    //   loading.dismiss();
    // }
  }

  async uploadQuestionPaper(event: any) {
    // const selectedFile: any = event.target.files[0];
    // const loading = await this.loadingCtrl.create({ message: 'Uploading question paper' });
    // loading.present();
    // try {
    //   const file = {
    //     file: selectedFile,
    //     name: this.courseId + '_G_' + this.testId + '_G_' + selectedFile.name,
    //     test_id: this.testId
    //   };
    //   const upload: any = await this.storageService.pushFileToStorage(file, `uploads/question_papers/${file.name}`);
    //   if (upload && upload.file_url) {
    //     const questionPaper: any = {
    //       file_url: upload.file_url,
    //       type: this.commonService.getExtension(selectedFile.name),
    //       name: selectedFile.name,
    //       test_id: this.testId,
    //     };
    //     if (this.commonService.isValidData(this.questionPaper?.id)) {
    //       questionPaper.id = this.questionPaper.id;
    //     }
    //     this.dataService.update(FirebaseCollections.QUESTION_PAPERS, questionPaper).then((resp: any) => {
    //       // console.log('resp::::::::::::\n', resp);
    //       loading.dismiss();
    //     }, err => {
    //       loading.dismiss();
    //       console.error('Error while uploading question paper:::::::::::\n', { ...err });
    //       if (err.code === 'not-found' || err.code === 'invalid-argument') {
    //         this.dataService.add(FirebaseCollections.QUESTION_PAPERS, questionPaper).then((resp: any) => {
    //           // console.log(resp);
    //           this.dataService.getScheduleByTestId(this.testId).subscribe((response: any) => {
    //             this.questionPaper = response[0];
    //           });
    //         }, (error: any) => {
    //           console.error('Error while adding question paper:::::::::::\n', error);
    //         });
    //       }
    //     });
    //   } else {
    //     console.error('Error while uploading question paper:::::::::::\n', upload);
    //     loading.dismiss();
    //   }
    // } catch (exception: any) {
    //   console.error('Exception while uploading question paper:::::::::::\n', exception, { ...exception });
    //   loading.dismiss();
    // }
  }

  async fileSelected(event: any) {
    const selectedFile: any = event.target.files[0];
    const loading = await this.loadingCtrl.create({ message: 'Uploading document' });
    loading.present();
    const file = {
      file: selectedFile,
      name: this.courseId + '_G_' + this.testId + '_G_' + selectedFile.name,
      test_id: this.testId
    };
    const upload: any = await this.storageService.pushFileToStorage(file);
    if (upload && upload.file_url) {
      if (this.test.file_urls && this.test.file_urls.length > 0) {
        this.test.file_urls.push({
          file_url: upload.file_url,
          type: this.commonService.getExtension(selectedFile.name),
          name: selectedFile.name
        });
      } else {
        this.test.file_urls = [{
          file_url: upload.file_url,
          type: this.commonService.getExtension(selectedFile.name),
          name: selectedFile.name
        }];
      }
      await this.dataService.updateTest(this.test);
      loading.dismiss();
    } else {
      console.error('Error while uploading file:::::::::::\n', upload);
      loading.dismiss();
    }
  }

  pageRendered(event: any) {
    // console.log('event::::::::::::::::::::\n', event);
  }

  zoomIn() {
    this.zoom = this.zoom === 0 ? 1 : this.zoom + 1;
  }

  zoomOut() {
    this.zoom = this.zoom - 1;
    if (this.zoom === 0) {
      this.zoom = 1;
    }
  }

}