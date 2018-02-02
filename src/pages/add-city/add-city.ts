import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { WeatherProvider } from '../../providers/weather/weather';


/**
 * Generated class for the AddCityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-city',
  templateUrl: 'add-city.html',
})
export class AddCityPage {


  @ViewChild("cityForm")
  cityForm : NgForm
  
  city:string = ""

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public weatherSvc: WeatherProvider 

  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCityPage');
  }

  processForm() {
    let city = this.cityForm.value.city;

    console.log("City >>>" , city);
    
      this.weatherSvc.addACity(city).then(
        (data) => {
          console.log(">> Data ",data)
          this.navCtrl.pop();
        }
      )
      .catch((error) => {
        console.log(">> error", error)
      })
    
    this.cityForm.reset()
  }

}
