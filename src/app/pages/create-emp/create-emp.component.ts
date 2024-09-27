import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { Location } from '@angular/common';
import { IndexDbService } from 'src/app/services/indexdb.service';
@Component({
  selector: 'app-create-emp',
  templateUrl: './create-emp.component.html',
  styleUrls: ['./create-emp.component.scss']
})
export class CreateEmpComponent {

  empName:any;
  selectedRole:any;
  selectedFromDate:any;
  selectedToDate:any;

  nextOneDayBtnCaptionFromModal :any;
  nextTwoDayBtnCaptionFromModal :any;
  nextOneDayDateFromModal :any
  nextTwoDayDateFromModal :any;
  laterWeekDateFromModal :any;

 
  
  constructor (private router: Router, public global: GlobalService,private modalController: ModalController, private location: Location
  ,private indexedDbService: IndexDbService){
    
  }
  ngOnInit(){
    this.global.setPageheader("Add Employee Details");

    const today = new Date();
    console.log("today", today)
     this.selectedFromDate=today.toISOString();;
    this.selectedToDate=today.toISOString(); 

    this.nextOneDayBtnCaptionFromModal = this.getDayOfWeek(today.getDay());
    this.nextTwoDayBtnCaptionFromModal = this.getDayOfWeek(today.getDay()+1)
    this.nextOneDayDateFromModal =  new Date().setDate(today.getDate()+7);
    this.nextTwoDayDateFromModal =  new Date().setDate(today.getDate()+8);
    this.laterWeekDateFromModal =  new Date().setDate(today.getDate()+7);

    // Format to 'YYYY-MM-DD' as required by ion-datetime
    
   /*  this.nextOneDayBtnCaption = 
    this.nextTwoDayBtnCaption = */
  }


 
  closeFromModal() {
    console.log("closeModal")
    this.selectedFromDate =null;
  this.modalController.dismiss();
  }
  closeToModal() {
    console.log("closeModal")
    this.selectedToDate =null;
  this.modalController.dismiss();
  }
  setTodayFromModal(){
    this.selectedFromDate = new Date();
  }
  nextOneDayFromModal(){
    this.selectedFromDate =  new Date(this.nextOneDayDateFromModal).toISOString();

  }
  nextTwoDayFromModal(){
    this.selectedFromDate =  new Date(this.nextTwoDayDateFromModal).toISOString();
  }
  laterWeekFromModal(){
    this.selectedFromDate =  new Date(this.laterWeekDateFromModal).toISOString();
    console.log("laterWeek", this.selectedFromDate)
   // this.selectedDate = new Date().setDate(this.selectedDate.getDate()+7);
  }


  setTodayToModal(){
    this.selectedToDate = new Date();
  }
  setToDateNull(){
    this.selectedToDate = null;
  }

  onFromDateChanged(event: any) {
    this.selectedFromDate = new Date(event.detail.value); // Handle the selected date

    this.nextOneDayBtnCaptionFromModal = this.getDayOfWeek(this.selectedFromDate.getDay());
    this.nextTwoDayBtnCaptionFromModal = this.getDayOfWeek(this.selectedFromDate.getDay()+1)

    this.nextOneDayDateFromModal = new Date().setDate(this.selectedFromDate.getDate()+7);
    this.nextTwoDayDateFromModal = new Date().setDate(this.selectedFromDate.getDate()+8);

    this.laterWeekDateFromModal = new Date().setDate(this.selectedFromDate.getDate()+7);
    console.log(this.selectedFromDate); // Log the selected date
  }

  onToDateChanged(event: any) {
    this.selectedToDate = new Date(event.detail.value); // Handle the selected date

  
    console.log(this.selectedToDate); // Log the selected date
  }

  getDayOfWeek(dayIndex: number): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    if(dayIndex > 6){
      dayIndex = 0;
  }
    return days[dayIndex];
  }

  saveFromDate(){
    console.log("from date",this.selectedFromDate)
    this.modalController.dismiss();

  }
  saveToDate(){
    console.log("To date",this.selectedToDate)
    this.modalController.dismiss();

  }

  goBack(){
    this.location.back(); 
  }

  saveData(){
    console.log("name", this.empName);
    console.log("role", this.selectedRole);
    console.log("from date", this.selectedFromDate);
    console.log("to date",this.selectedToDate)

   let dataToSave = {  name:  this.empName, role: this.selectedRole, fromDate:this.selectedFromDate, toDate:this.selectedToDate };
    this.indexedDbService.saveData(dataToSave).then(() => {
      console.log('Data saved successfully');
    });

    this.fetchAllData();
  }

/*   fetchData() {
    this.indexedDbService.getData(1).then(data => {
      console.log('Fetched data:', data);
    });
  } */

  fetchAllData() {
    this.indexedDbService.getAllData().then(data => {
      console.log('All data:', data);
    });
  }


}
