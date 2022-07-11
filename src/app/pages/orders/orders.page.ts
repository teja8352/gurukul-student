import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Order } from 'src/app/models/course.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonService } from 'src/app/services/common/common.service';
import { StateService } from 'src/app/services/state/state.service';
import { DataService } from '../../services/data/data.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  public orders: Order[] = [];
  constructor(
    private dataService: DataService,
    private cd: ChangeDetectorRef,
    private alertCtrl: AlertController,
    private commonService: CommonService,
    private stateService: StateService,
    private authService: AuthService
  ) {
    this.dataService.getOrdersList().subscribe(res => {
      this.orders = res;
      this.cd.detectChanges();
    });
  }

  ngOnInit() {
  }

}
