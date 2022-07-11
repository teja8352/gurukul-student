/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { Test } from 'src/app/models/course.interface';
import { CommonService } from 'src/app/services/common/common.service';
import { DataService } from 'src/app/services/data/data.service';
import { StateService } from 'src/app/services/state/state.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { saveAs } from 'file-saver';
import { Student } from 'src/app/models/student.interface';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

  public test: Test = null;
  private courseId: string;
  private testId: string;
  public student: Student;
  public segment: string = 'content';

  constructor(
    private cd: ChangeDetectorRef,
    private dataService: DataService,
    private stateService: StateService,
    private storageService: StorageService,
    private loadingCtrl: LoadingController,
    private commonService: CommonService,
    private http: HttpClient
  ) {
    this.courseId = this.stateService.getData('course')?.id || '';
    this.testId = this.stateService.getData('test')?.id || '';
    this.dataService.getTestById(this.testId).subscribe((resp: any) => {
      this.test = resp;
      this.cd.detectChanges();
    });
    this.dataService.getStudentById(localStorage.getItem('uid') || '').subscribe((resp: any) => {
      this.student = resp[0];
      localStorage.setItem('student', JSON.stringify(this.student));
      this.cd.detectChanges();
    });
  }

  ngOnInit() {
  }

  segmentChanged(event: any) {
    console.log(event);
  }

  async fileSelected(event: any) {
    const selectedFile: any = event.target.files[0];
    const loading = await this.loadingCtrl.create({ message: 'Uploading answer' });
    loading.present();
    const file = {
      file: selectedFile,
      name: selectedFile.name
    };
    const upload: any = await this.storageService.uploadAnswer(file);
    if (upload && upload.file_url) {
      if (this.test.answers && this.test.answers.length > 0) {
        this.test.answers.push({
          file_url: upload.file_url,
          type: this.commonService.getExtension(selectedFile.name),
          name: selectedFile.name,
          student_id: this.student.id,
          student_name: this.student.first_name + ' ' + this.student.last_name
        });
      } else {
        this.test.answers = [{
          file_url: upload.file_url,
          type: this.commonService.getExtension(selectedFile.name),
          name: selectedFile.name,
          student_id: this.student.id,
          student_name: this.student.first_name + ' ' + this.student.last_name
        }];
      }
      await this.dataService.updateTest(this.test);
      loading.dismiss();
    } else {
      console.error('Error while uploading file:::::::::::\n', upload);
      loading.dismiss();
    }
  }

  download(file: any) {

    saveAs(file.file_url, file.name);

    // const headers = new HttpHeaders()
    //   .set('content-type', '*/*')
    //   .set('Access-Control-Allow-Origin', '*')
    //   .append('content-type', 'application/json');
    // this.http.get(file.file_url, { headers }).subscribe((response) => {
    //   console.log(response);
    // });


    // const xhr = new XMLHttpRequest();
    // xhr.responseType = 'blob';
    // xhr.onload = (event) => {
    //   /* Create a new Blob object using the response
    //   *  data of the onload object.
    //   */
    //   const blob = new Blob([xhr.response], {});
    //   const a: any = document.createElement('a');
    //   a.style = 'display: none';
    //   document.body.appendChild(a);
    //   const url = window.URL.createObjectURL(blob);
    //   a.href = url;
    //   a.download = file.name;
    //   a.click();
    //   window.URL.revokeObjectURL(url);
    // };
    // xhr.open('GET', file.file_url);
    // xhr.send();




    // const a = document.createElement('a');
    // a.style.display = 'none';
    // a.setAttribute('download', file.name);
    // a.href = file.file_url;
    // // the filename you want
    // a.download = file.name;
    // document.body.appendChild(a);
    // a.click();
    // a.remove();

    // This can be downloaded directly:
    // const xhr = new XMLHttpRequest();
    // xhr.responseType = 'blob';
    // xhr.onload = (event) => {
    //   const blob = xhr.response;
    // };
    // xhr.open('GET', file.file_url);
    // xhr.send();
  }

}
