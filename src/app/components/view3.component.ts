import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryNewsDataBase } from '../countrynews.database';

@Component({
  selector: 'app-view3',
  templateUrl: './view3.component.html',
  styleUrls: ['./view3.component.css']
})
export class View3Component implements OnInit {

  countryCode:string = ''
  countryName:string = ''

  results:any;

  key:any;

  searchArticle:any;

  constructor(private http:HttpClient, private activatedroute: ActivatedRoute, private dataDB: CountryNewsDataBase) { }

  async ngOnInit() {

    this.results = await this.dataDB.getCountry()

    this.key = this.results[0].apikey

    this.countryCode = this.activatedroute.snapshot.params.countrycode;
    this.countryName = this.activatedroute.snapshot.params.country;

    const params = new HttpParams()
      .set('apiKey', this.key)
      .set('pageSize', '30')
    
    const url = `https://newsapi.org/v2/top-headlines?country=${this.countryCode.toLowerCase()}`

    const result = await this.http.get<any>(url, {params})
      .toPromise()

      // console.log(result.articles);
        
        this.searchArticle = result.articles.map(r=>{
          return{
            sourceName: r['source.name'],
            author: r['author'],
            title: r['title'],
            description: r['description'],
            url: r['url'],
            image: r['urlToImage'],
            publishedAt: r['publishedAt'],
            content: r['content'],
          }
        })
        // console.log(this.searchArticle);


    this.results[0].articles = this.searchArticle;
    console.log(this.results[0].articles);

    console.log(Date.now());
    

    this.dataDB.updateArticle(this.results[0])

  }
}
