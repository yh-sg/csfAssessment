import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view3',
  templateUrl: './view3.component.html',
  styleUrls: ['./view3.component.css']
})
export class View3Component implements OnInit {

  searchArticle:any;

  constructor(private http:HttpClient) { }

  async ngOnInit() {
    const url = ""

    const result = await this.http.get<any>(url)
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

        console.log(this.searchArticle);

  }

}
