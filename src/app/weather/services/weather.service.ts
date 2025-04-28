import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '5ec48883e787cf7c48ee564cce4d7f21';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<any> {
    const url = `${this.apiUrl}${city}&appid=${this.apiKey}`;
    console.log(url);
    
    return this.http.get(url);
  }
}
