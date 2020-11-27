import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountryNewsDataBase } from '../countrynews.database';

@Component({
  selector: 'app-view1',
  templateUrl: './view1.component.html',
  styleUrls: ['./view1.component.css']
})
export class View1Component implements OnInit {

  results: any;
  searchCountries:any;

  constructor(private http:HttpClient, private router:Router, private dataDB:CountryNewsDataBase) { }

  async ngOnInit() {

    // const url = "https://restcountries.eu/rest/v2/all"

    // const result = await this.http.get<any>(url)
    //   .toPromise()

    //   // console.log(result);
    
    //     this.searchCountries = result.map(r=>{
    //       return{
    //         name: r['name'],
    //         alpha2Code: r['alpha2Code'],
    //         flag: r['flag']
    //       }
    //     })

        this.results = await this.dataDB.getCountry()

        this.searchCountries = this.results[0].countryList

        console.log(this.searchCountries);
        

      // console.log(this.searchCountries);
  }

  toView2(){
    this.router.navigate(['/view2'])
  }

  toView3(){
    this.router.navigate(['/view3'])
  }

}
