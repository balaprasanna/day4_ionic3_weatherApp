import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Storage } from "@ionic/storage";
import "rxjs/add/operator/take"
import "rxjs/add/operator/toPromise"

/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WeatherProvider {

  API_KEY :string= "3af4185f06b6f8d839b72273c3d006f4"

  readonly CITIES:string = "cities"

  constructor(
        public http: HttpClient,
        private storage: Storage) {
    console.log('Hello WeatherProvider Provider');
    
  }

  loadCities(): Promise<any> {
    return (this.storage.get(this.CITIES))
  }

  saveCities(cities: string[]):Promise<any> {
    return (this.storage.set(this.CITIES,cities))
  }

  addACity(city: string):Promise<any> {

    const p = new Promise((resolve, reject) => {

      this.loadCities()
            .then((data) => {
              if (data.length > 0) {
                data.push(city);
                this.saveCities(data);
                return (data)
              }
            })
            .then((data_retured) => { 
              resolve(data_retured)
              console.log("The data_retured comes from , `data` variable inside load cities then function")
             })
            .catch((error) => {
              reject(error);
            })
    });

   return (p);
  }

  removeCity(city: string):Promise<any> {

    const p = new Promise((resolve, reject) => {

      this.loadCities()
            .then((data) => {
              if (data.length > 0) {
                // need to update
                const index = data.indexOf(city);
                data.splice(index, 1);
                // Save the data back.
                this.saveCities(data);
                return (data)
              }
            })
            .then((data_retured) => { 
              resolve(data_retured)
             })
            .catch((error) => {
              reject(error);
            })
    });

   return (p);
  }

  getWeatherInfo(city:string) :Promise<any> {
    let url: string = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.API_KEY}`;

    const p = new Promise((resolve, reject) => {
      this.http.get(url)
        .take(1)
        .toPromise()
        .then((data: any) => {
          resolve(
            {
              name:data.name,
              coord:data.coord,
              weather:data.weather
            }
          )
        })
        .catch((error) => {
          reject(error) 
        })

    })

    return (p)
 
  }


}
