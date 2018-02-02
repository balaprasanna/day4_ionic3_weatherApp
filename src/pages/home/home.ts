import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ForecastPage } from '../forecast/forecast';
import { AddCityPage } from '../add-city/add-city';
import { WeatherProvider } from '../../providers/weather/weather';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  cities: string[] = [ 'Singapore', 'India' ]

  constructor(public navCtrl: NavController,
              private weatherSvc:WeatherProvider) { }

  ionViewWillEnter(){
    this.weatherSvc.loadCities().then(
      (data) => {
        console.log(">>> Data, ",data)
        if (data) {
          this.cities = data
        } else {
          this.weatherSvc.saveCities(this.cities)
            .then(
              (result) => { console.log(">>> success", result)}
            )
            .catch(
              (error) => { console.log(">>>> error", error)}
            )

        }
      }
    )
  }

  addCity() :void {
    this.navCtrl.push(AddCityPage)
  }

  toForcast(cityName:string): void {
    this.navCtrl.push(ForecastPage, {city: cityName})
  }
  removeCity(city:string) :void {
    this.weatherSvc.removeCity(city)
    .then((data) => {
      this.cities = data
    })
    .catch((error) => {
      console.log("error >> ", error) 
    })
  }
}
