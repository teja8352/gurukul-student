import { HttpClient, HttpEventType } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, Platform } from '@ionic/angular';
import * as saveAs from 'file-saver';
import { Test } from 'src/app/models/course.interface';
import { CommonService } from 'src/app/services/common/common.service';
import { DataService } from 'src/app/services/data/data.service';
import { StateService } from 'src/app/services/state/state.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Downloader, DownloadRequest, NotificationVisibility } from '@ionic-native/downloader/ngx';
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
// import { File } from '@awesome-cordova-plugins/file/ngx';
import { VideoPlayer } from '@awesome-cordova-plugins/video-player/ngx';
import { VideoPlayerPage } from 'src/app/video-player/video-player.page';
import { Student } from 'src/app/models/student.interface';
import { FirebaseCollections } from 'src/app/constants/fb-collections';
@Component({
  selector: 'app-purchased-test',
  templateUrl: './purchased-test.page.html',
  styleUrls: ['./purchased-test.page.scss'],
})
export class PurchasedTestPage implements OnInit {
  public test: Test = null;
  private courseId: string;
  private testId: string;
  public remarks: any;
  public segment = 'schedule';
  private audio: HTMLAudioElement;
  public schedule: any = null;
  public answerSheet: any = null;
  public questionPaper: any = null;
  public isAudioPlaying = true;
  public zoom = 1;
  public downloadProgress = 0;
  public student: Student;

  constructor(
    private cd: ChangeDetectorRef,
    private http: HttpClient,
    private dataService: DataService,
    private stateService: StateService,
    private storageService: StorageService,
    private loadingCtrl: LoadingController,
    private commonService: CommonService,
    // private transfer: FileTransfer,
    // private file: File,
    private videoPlayer: VideoPlayer,
    private platform: Platform,
    private modalController: ModalController,
    private downloader: Downloader,
  ) {
    this.courseId = this.stateService.getData('course')?.id || 'MXjcmrbvH9fKCd62NMd0';
    this.testId = this.stateService.getData('test')?.id || '2zVzaq6HimnRKycKiNW9';
    this.dataService.getTestById(this.testId).subscribe((resp: any) => {
      this.test = resp;
      this.cd.detectChanges();
    });
    this.dataService.getAnswerSheetByTestId(this.testId).subscribe((resp: any) => {
      this.answerSheet = resp[0];
      this.cd.detectChanges();
    });
    this.dataService.getQuestionPaperByTestId(this.testId).subscribe((resp: any) => {
      this.questionPaper = resp[0];
      this.zoom = this.segment === 'question-papers' ? 1 : this.zoom;
      this.cd.detectChanges();
    });
    this.dataService.getStudentById(localStorage.getItem('student_id') || '').subscribe((resp: any) => {
      this.student = resp;
      localStorage.setItem('student', JSON.stringify(this.student));
      this.cd.detectChanges();
    });
    this.dataService.getRemarksByTestId(this.testId, localStorage.getItem('student_id')).subscribe((response: any) => {
      this.remarks = response[0];
      this.cd.detectChanges();
    });
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

  async playVideo(file: any) {
    console.log('video file:::::::::', file);
    const modal = await this.modalController.create({
      component: VideoPlayerPage,
      componentProps: { file },
      cssClass: 'video-modal',
      backdropDismiss: false,
    });
    modal.present();
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

  async uploadAnswerSheet(event: any) {
    const selectedFile: any = event.target.files[0];
    const loading = await this.loadingCtrl.create({ message: 'Uploading Answer Sheet' });
    loading.present();
    try {
      const file = {
        file: selectedFile,
        name: this.courseId + '_G_' + this.testId + '_G_' + selectedFile.name,
        test_id: this.testId
      };
      const upload: any = await this.storageService.uploadAnswer(file, `uploads/answer_sheets/${file.name}`);
      if (upload && upload.file_url) {
        const answerSheet: any = {
          file_url: upload.file_url,
          type: this.commonService.getExtension(selectedFile.name),
          name: selectedFile.name,
          test_id: this.testId,
          student_id: this.student.id,
          student_name: this.student.first_name + ' ' + this.student.last_name,
        };
        if (this.commonService.isValidData(this.answerSheet?.id)) {
          answerSheet.id = this.answerSheet.id;
        }
        this.dataService.update(FirebaseCollections.ANSWER_SHEET, answerSheet).then((resp: any) => {
          // console.log('resp::::::::::::\n', resp);
          const notification: any = {
            title: 'Answer sheet updated',
            description: this.student.first_name + ' ' + this.student.last_name + ' updated the answer sheet.',
            test_id: this.testId,
            studen_id: this.student.id,
            student_name: this.student.first_name + ' ' + this.student.last_name,
            status: 'unread'
          };
          this.dataService.add(FirebaseCollections.NOTIFICATIONS, notification).then((resp: any) => {
            //
          }, err => {
            console.error('Error while adding notification:::::::::::\n', upload);
          });
          loading.dismiss();
        }, err => {
          loading.dismiss();
          console.error('Error while uploading answer sheet:::::::::::\n', { ...err });
          if (err.code === 'not-found' || err.code === 'invalid-argument') {
            this.dataService.add(FirebaseCollections.ANSWER_SHEET, answerSheet).then((resp: any) => {
              // console.log(resp);
              const notification: any = {
                title: 'Answer sheet uploaded',
                description: this.student.first_name + ' ' + this.student.last_name + ' submitted the answer sheet.',
                test_id: this.testId,
                studen_id: this.student.id,
                student_name: this.student.first_name + ' ' + this.student.last_name,
                status: 'unread'
              };
              this.dataService.add(FirebaseCollections.NOTIFICATIONS, notification).then((resp: any) => {
                //
              }, err => {
                console.error('Error while adding notification:::::::::::\n', upload);
              });
              this.dataService.getAnswerSheetByTestId(this.testId).subscribe((response: any) => {
                this.answerSheet = response[0];
              });
            }, (error: any) => {
              console.error('Error while adding answer sheet:::::::::::\n', error);
            });
          }
        });
      } else {
        console.error('Error while uploading answer sheet:::::::::::\n', upload);
        loading.dismiss();
      }
    } catch (exception: any) {
      console.error('Exception while uploading answer sheet:::::::::::\n', exception, { ...exception });
      loading.dismiss();
    }
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

  async downloadQuestionPaper() {
    const loading = await this.loadingCtrl.create({
      message: 'Downloading ' + '',
    });
    loading.present();
    // this.http.get('', { responseType: 'blob', reportProgress: true, observe: 'events' }).subscribe(async event => {
    //   if (event.type === HttpEventType.DownloadProgress) {
    //     this.downloadProgress = Math.round((100 * event.loaded) / event.total);
    //   } else if (event.type === HttpEventType.Response) {
    //     this.downloadProgress = 0;
    //     const base64 = await this.converBlobToBase64(event.body) as string;

    //     const foo = await Filesystem.writeFile({
    //       path: '',
    //       data: base64,
    //       directory: Directory.Documents
    //     });
    //     loading.dismiss();
    //   }
    // }, (err: any) => {
    //   console.error('Error while downloading the question paper:::::::::::::\n', err);
    //   loading.dismiss();
    // });
    const request: DownloadRequest = {
      uri: this.schedule.file_url,
      title: this.schedule.name,
      description: '',
      mimeType: '',
      visibleInDownloadsUi: true,
      notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
      destinationInExternalFilesDir: {
        dirType: 'Download',
        subPath: this.schedule.name
      }
    };
    this.downloader.download(request).then((location: string) => {
      console.log('File downloaded at:' + location);
      loading.dismiss();

    }, (error: any) => {
      console.error('Error while downloading pdf:::::::', error);
    });
  }

  downloadValuesAnswerSheet() {
    const request: DownloadRequest = {
      uri: this.schedule.file_url,
      title: this.schedule.name,
      description: '',
      mimeType: '',
      visibleInDownloadsUi: true,
      notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
      destinationInExternalFilesDir: {
        dirType: 'Download',
        subPath: this.schedule.name
      }
    };
    this.downloader.download(request).then((location: string) => {
      console.log('File downloaded at:' + location);
    }, (error: any) => {
      console.error('Error while downloading pdf:::::::', error);
    });
  }

  saveFile(base64: any) {
    Filesystem.writeFile({
      path: 'name',
      data: base64,
      directory: Directory.Documents
    }).then((resp: any) => {
      this.commonService.presentToast('' + ' downloaded.');
    }, (err: any) => {
      console.error('Error while saving the file:::::::\n', err);
    });
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

  downloadPdf() {
    const request: DownloadRequest = {
      uri: this.schedule.file_url,
      title: this.schedule.name,
      description: '',
      mimeType: '',
      visibleInDownloadsUi: true,
      notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
      destinationInExternalFilesDir: {
        dirType: 'Download',
        subPath: this.schedule.name
      }
    };
    this.downloader.download(request)
      .then((location: string) => {
        console.log('File downloaded at:' + location);
      }, (error: any) => {
        console.error('Error while downloading pdf:::::::', error);
      });
    // this.platform.ready().then(() => {
    //   const fileTransfer: FileTransferObject = this.transfer.create();
    //   fileTransfer.download(this.schedule.file_url, this.file.dataDirectory + this.schedule.name).then((entry) => {
    //     console.log('download complete: ' + entry.toURL());
    //   }, (error) => {
    //     console.log("error:::::::", error)
    //   });
    // });
  }

  private converBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}
