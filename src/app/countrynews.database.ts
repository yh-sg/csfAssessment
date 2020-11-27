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
                API_KEY: d.API_KEY,
                countryList:d.countryList,
                articles:d.articles
            }
        })
    }

}
