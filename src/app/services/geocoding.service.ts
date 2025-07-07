import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  /**
  * API key for accessing the OpenCage Geocoding API.
  * Retrieved from Angular environment configuration.
  * 
  * @private
  */
  private apiKey = environment.opencageApiKey;

  /**
  * Constructs the GeocodingService.
  * 
  * @param http - Angular HttpClient used to perform HTTP requests to the OpenCage API.
  */
  constructor(private http: HttpClient) {}

  /**
  * Converts a human-readable address string into geographic coordinates (latitude and longitude)
  * using the OpenCage Geocoding API.
  *
  * @param address - The full address to geocode (e.g., street, zip, city, province, country).
  * @returns An Observable that emits an object containing `lat` and `lng` if the address is resolved successfully.
  * @throws An error if no geocoding results are found.
  */
  getCoordinates(address: string): Observable<{ lat: number, lng: number }> {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${this.apiKey}&language=it`;

    return this.http.get<any>(url).pipe(
      map(response => {
        if (response.results.length > 0) {
          const geometry = response.results[0].geometry;
          return { lat: geometry.lat, lng: geometry.lng };
        } else {
          throw new Error('No results found');
        }
      })
    );
  }

}
