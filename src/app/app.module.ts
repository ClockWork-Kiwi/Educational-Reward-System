import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule, MatCommonModule, MatIconModule} from '@angular/material';
import {NgxWheelModule} from 'ngx-wheel';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCommonModule,
    MatCardModule,
    MatIconModule,
    NgxWheelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
