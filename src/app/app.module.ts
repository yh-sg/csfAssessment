import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { View1Component } from './components/view1.component';
import { View2Component } from './components/view2.component';
import { View3Component } from './components/view3.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountryNewsDataBase } from './countrynews.database';

const ROUTES: Routes = [
  {path: "view1", component: View1Component},
  {path: "view2", component: View2Component},
  {path: "view3/:countrycode/:country", component: View3Component},
  {path: "**", redirectTo:"/view2", pathMatch:"full"}
] 

@NgModule({
  declarations: [
    AppComponent,
    View1Component,
    View2Component,
    View3Component
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CountryNewsDataBase],
  bootstrap: [AppComponent]
})
export class AppModule { }
