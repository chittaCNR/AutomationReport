import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DropdownModule,
    InputTextModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    InputTextareaModule,
    DropdownModule,
    CalendarModule,
    TableModule,
    InputIconModule,
    IconFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
