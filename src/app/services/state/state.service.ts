import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private _data: any = {};

  constructor() { }

  getData(key: string): any {
    return this._data[key];
  }

  setData(key: string, value: any) {
    this._data[key] = value;
  }
}
