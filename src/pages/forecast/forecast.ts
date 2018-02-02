import { Component, } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';

/**
 * Generated class for the ForecastPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-forecast',
  templateUrl: 'forecast.html',
})
export class ForecastPage {

  city:string = ''
  weather:any = {}
  loader
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private weatherSvc: WeatherProvider,
    private lc: LoadingController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForecastPage');
    this.loader = this.lc.create(
      {
        content: "Please wait...",
        duration: 3000
      }
    )
    this.loader.present();
  }
 
  ionViewDidEnter() {
    // console.log("View did loaded...")
  }


  ionViewWillEnter() {
    console.log("Will enter...")
    this.city = this.navParams.get("city");
    console.log("City =>> ",this.city)

    this.weatherSvc.getWeatherInfo(this.city)
      .then((data) => {
        console.log(">> data ", data)
        this.weather = data;
        this.loader.dismissAll()
      })
       .catch((error) => {
        console.log(">> error", error)
      })
  
  }

  share() :void {
    console.log("Share clicked..")
  }
}
