import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';



@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],

})
export class WeatherComponent {
  city: string = '';
  weatherData: any;
  errorMessage: string = '';
  currentDate = new Date().toDateString();
  weatherIcon: string = '';

hourlyData = [
  { temp: 19, icon: 'assets/cloudy.png', time: '15.00' },
  { temp: 18, icon: 'assets/cloudy.png', time: '16.00' },
  { temp: 18, icon: 'assets/cloudy.png', time: '17.00' },
  { temp: 18, icon: 'assets/cloudy.png', time: '18.00' },
];


  constructor(private weatherService: WeatherService) {}

  getWeather() {
    if (this.city.trim() === '') {
      this.errorMessage = 'Please enter a city name';
      this.weatherData = null;
      return;
    }

    this.weatherService.getWeather(this.city).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.errorMessage = '';
      },
      error: (error) => {
        this.weatherData = null;
        this.errorMessage = 'City not found or API error!';
      }
    });
  }
}
