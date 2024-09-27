import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { IndexDbService } from 'src/app/services/indexdb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  empData = signal<any[]>([]); 
  filteredEmpDataWithDate= signal<any[]>([]);;
  filteredEmpDataWithoutDate= signal<any[]>([]);;
  constructor (private router: Router, public global: GlobalService,
    private indexedDbService: IndexDbService
  ){
    this.fetchAllData();
  }

  fetchAllData() {
    this.indexedDbService.getAllData().then(data => {
      console.log('All data:', data);
      this.empData.set(data); 
      this.filterEmployees();
    });
  }

  ngOnInit(){
    this.global.setPageheader("Employees List");
  }

  gotoCreateEmp(){
    this.router.navigate(['/create-emp']); 
  }

  filterEmployees() {
    this.filteredEmpDataWithDate.set(this.empData().filter((employee:any) => employee.toDate !== null)); 
    this.filteredEmpDataWithoutDate.set(this.empData().filter((employee:any) => employee.toDate == null)); 
  /*   this.filteredEmpDataWithDate = this.empData().filter((employee:any) => employee.toDate !== null);
    this.filteredEmpDataWithoutDate = this.empData().filter((employee:any) => employee.toDate == null); */
  }

  deleteEmp(employee:any){
    

    this.indexedDbService.deleteData(employee.id).then(data => {
     console.log("data AFTER delete", data)

     this.empData.update(employees => employees.filter(emp => emp.name !== employee.name));
     if(employee.toDate){
      this.filteredEmpDataWithDate.update(employees => employees.filter(emp => emp.name !== employee.name)); 
     // console.log("with to date", this.filteredEmpDataWithDate())
     }else{
      this.filteredEmpDataWithoutDate.update(employees => employees.filter(emp => emp.name !== employee.name)); 
     }
    });
  }

  gotoEditEmp(employeeObj:any){
    //this.router.navigate(['/create-emp']); 
    this.router.navigate(['/create-emp'], { state: { data:employeeObj } });
  }

}
