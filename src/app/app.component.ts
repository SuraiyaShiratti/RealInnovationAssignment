import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from './services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'real-innovation-poc';
  pageheader :any;
  constructor (private router: Router, public global: GlobalService){
    
  }

  ngOnInit(){
  
  }
}
