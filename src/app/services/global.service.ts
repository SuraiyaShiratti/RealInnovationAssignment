import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {


  pageHeader :any;
  constructor() { }


  setPageheader(headerValue:string){
    this.pageHeader = headerValue;
  }

  getPageHeader():string{
    return this.pageHeader;
  }
}
