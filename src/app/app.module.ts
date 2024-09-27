import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CreateEmpComponent } from './pages/create-emp/create-emp.component';
import { GlobalService } from './services/global.service';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { IonicModule } from '@ionic/angular';  

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateEmpComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatSelectModule,
    IonicModule.forRoot({})
  ],
  providers: [GlobalService],
  bootstrap: [AppComponent],
})
export class AppModule { }
