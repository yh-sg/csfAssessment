import { Injectable } from "@angular/core";
import Dexie from 'dexie';
import { Data } from './model';

@Injectable()

export class CountryNewsDataBase extends Dexie{
    private data: Dexie.Table<Data, string>

    constructor(){
        super('newsdb')

        //create schema
        this.version(1).stores({
            data: "++id,apikey"
        })

        //get a ref to the search collection
        this.data = this.table('data')
    }

    async saveApi(t:Data): Promise<any>{
        return await this.data.put(t)
    }

   async getCountry(): Promise<Data[]>{
        return (await this.data.toArray())
        .map(d=>{
            return{
                id: d.id,
                apikey: d.apikey,
                countryList:d.countryList,
                articles:d.articles
            }
        })
    }

    async getApi(apik: string): Promise<Data> {
        return (await this.data.get(apik)) as Data;
      }

      async deleteApi(apik: string): Promise<any>{
        // return await this.data.delete(t.apikey)
        return await this.data
            .where('apikey').equals(apik)
            .delete()
      }

      async updateArticle(t: Data): Promise<any>{
        // this.todo2.add(t)
        return await this.data.put(t)
    }

}
