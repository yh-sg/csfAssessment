import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { CountryNewsDataBase } from '../countrynews.database';

@Component({
  selector: 'app-view2',
  templateUrl: './view2.component.html',
  styleUrls: ['./view2.component.css']
})
export class View2Component implements OnInit {

  form: FormGroup

  searchCountries:any;

  constructor(private dataDB: CountryNewsDataBase,private router:Router, private fb:FormBuilder, private http:HttpClient) { }

  async ngOnInit() {
    this.form = this.fb.group({
      apikey: this.fb.control("",[Validators.required, Validators.minLength(10)])
    })
    const url = "https://restcountries.eu/rest/v2/all"

    const result = await this.http.get<any>(url)
      .toPromise()

      this.searchCountries = result.map(r=>{
        return{
          name: r['name'],
          alpha2Code: r['alpha2Code'],
          flag: r['flag']
        }
      })
  }

  toView1(){
    this.router.navigate(['view1'])
  }

  async add(){
    console.log(this.form.value.apikey);
    const re:Data = {
      API_KEY: this.form.value.apikey,
      countryList: this.searchCountries
    }

    await this.dataDB.saveApi(re)

    this.toView1()

  }

  delete(){

  }

}
