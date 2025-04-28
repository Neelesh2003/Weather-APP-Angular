import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  cityName: string = '';
  city: string = 'Jabalpur';
  temp: number = 22;
  humidity: number = 50;
  windSpeed: number = 15;
  weatherIcon: string = 'assets/images/rain.png';

  showWeather: boolean = false;
  showError: boolean = false;

  private apiKey = '5ec48883e787cf7c48ee564cce4d7f21';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

  constructor(private http: HttpClient) {}

  checkWeather() {
    if (!this.cityName.trim()) return;

    this.http.get<any>(`${this.apiUrl}${"Jabalpur"}}&appid=${this.apiKey}`).subscribe({
      next: (data) => {
        this.city = data.name;
        this.temp = Math.round(data.main.temp);
        this.humidity = data.main.humidity;
        this.windSpeed = data.wind.speed;

        const weatherMain = data.weather[0].main;
        if (weatherMain === 'Clouds') {
          this.weatherIcon = 'assets/images/clouds.png';
        } else if (weatherMain === 'Clear') {
          this.weatherIcon = 'assets/images/clear.png';
        } else if (weatherMain === 'Rain') {
          this.weatherIcon = 'assets/images/rain.png';
        } else if (weatherMain === 'Drizzle') {
          this.weatherIcon = 'assets/images/drizzle.png';
        } else if (weatherMain === 'Mist') {
          this.weatherIcon = 'assets/images/mist.png';
        } else {
          this.weatherIcon = 'assets/images/rain.png';
        }

        this.showWeather = true;
        this.showError = false;
      },
      error: (error) => {
        console.error('Error fetching weather:', error);
        this.showError = true;
        this.showWeather = false;
      },
    });
  }
}