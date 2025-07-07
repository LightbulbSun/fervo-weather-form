import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  /**
   * Base URL for the Open-Meteo historical weather API.
   * @private
   */
  private baseUrl = environment.openMeteoBaseUrl;

  /**
   * Constructor for WeatherService.
   * 
   * @param http - Angular HttpClient used to make API requests.
   */
  constructor(private http: HttpClient) {}

  /**
   * Fetches historical weather data (daily max/min temperatures and precipitation)
   * from the Open-Meteo API for the specified coordinates and date range.
   *
   * @param lat - Latitude of the location.
   * @param lon - Longitude of the location.
   * @param startDate - Start date in `YYYY-MM-DD` format.
   * @param endDate - End date in `YYYY-MM-DD` format.
   * @returns An Observable emitting an object with arrays of dates, max/min temperatures, and precipitation.
   * @throws An error if the response does not contain weather data.
   */
  getHistoricalWeather(lat: number, lon: number, startDate: string, endDate: string): Observable<any> {
    const url = `${this.baseUrl}?latitude=${lat}&longitude=${lon}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Europe%2FRome`;

    return this.http.get(url).pipe(
      map((res: any) => {
        if (res?.daily?.temperature_2m_max?.length) {
          return {
            date: res.daily.time,
            tempMax: res.daily.temperature_2m_max,
            tempMin: res.daily.temperature_2m_min,
            precipitation: res.daily.precipitation_sum
          };
        } else {
          throw new Error('No weather data available');
        }
      })
    );
  }
}
