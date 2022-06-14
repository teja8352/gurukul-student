import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common/common.service';
import { DataService } from 'src/app/services/data/data.service';
import { StateService } from 'src/app/services/state/state.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  uploadedURL: string;
  constructor(
    private dataService: DataService,
    private stateService: StateService,
    private storageService: StorageService,
    private loadingCtrl: LoadingController,
    private commonService: CommonService
  ) {
  }

  ngOnInit() {
  }

  copyURL() {
    navigator.clipboard.writeText(this.uploadedURL);
  }

  async fileSelected(event: any) {
    const selectedFile: any = event.target.files[0];
    const loading = await this.loadingCtrl.create({ message: 'Uploading document' });
    loading.present();
    const upload: any = await this.storageService.pushFileToStorage({ file: selectedFile, name: selectedFile.name });
    if (upload && upload.file_url) {
      this.uploadedURL = upload.file_url;
      loading.dismiss();
    } else {
      console.error('Error while uploading file:::::::::::\n', upload);
      loading.dismiss();
    }
  }
}
