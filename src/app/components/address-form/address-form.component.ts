import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { finalize, switchMap } from 'rxjs';
import { GeocodingService } from 'src/app/services/geocoding.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'fervo-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {

  /**
 * Reactive form group that holds the address input fields.
 * Initialized in ngOnInit().
 */
addressForm!: FormGroup;

/**
 * Object containing the weather data retrieved from the weather API.
 * Used to render the temperature chart.
 */
weatherData: any;

/**
 * Optional error message shown when the start date is after the end date.
 * If null, no error is shown.
 */
dateError: string | null = null;

/**
 * Indicates whether a data-fetching operation is currently in progress.
 * Used to disable the form and show a loading spinner.
 */
loading = false;


/**
 * Constructs the AddressFormComponent and injects required services.
 *
 * @param fb - Angular FormBuilder service used to create the reactive form group.
 * @param geocodingService - Custom service used to convert an address string into geographic coordinates (latitude and longitude).
 * @param weatherService - Custom service used to retrieve historical weather data based on geographic coordinates and date range.
 */
constructor(
  private fb: FormBuilder,
  private geocodingService: GeocodingService,
  private weatherService: WeatherService
) {}


  /**
    * Initializes the component by building the reactive form with validators.
  */
  ngOnInit(): void {
    this.addressForm = this.fb.group({
      street: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      city: ['', Validators.required],
      province: ['', Validators.required],
      country: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  /**
  * Handles form submission.
  * If the form is valid:
  * - Constructs the full address string
  * - Validates the date range
  * - Fetches geolocation coordinates
  * - Retrieves historical weather data
  * - Manages loading state and error messages
  */
  onSubmit(): void {
    if (this.addressForm.valid) {
      const form = this.addressForm.value;
      this.loading = true;

      // Build the full address string to be passed to the geocoding service
      const fullAddress = `${form.street}, ${form.zip} ${form.city}, ${form.province}, ${form.country}`;

      // Convert date strings to Date objects
      const start = new Date(form.startDate);
      const end = new Date(form.endDate);

      // Validation: ensure the start date is not after the end date
      if (start > end) {
        this.dateError = 'The start date cannot be after the end date.';
        this.loading = false;
        this.weatherData = null;
        return;
      }

      // Clear any previous date error
      this.dateError = null;

      const { startDate, endDate } = this.addressForm.value;

      // Fetch coordinates, then weather data using RxJS operators
      this.geocodingService.getCoordinates(fullAddress).pipe(
        switchMap(coords => 
          this.weatherService.getHistoricalWeather(coords.lat, coords.lng, startDate, endDate)
        ),
        finalize(() => this.loading = false) // Stop the loading spinner regardless of success or failure
      ).subscribe(weather => {
        this.weatherData = weather; // Store the received weather data
      });

    } else {
      // Mark all fields as touched to trigger validation messages
      this.addressForm.markAllAsTouched();
    }
  }

  /**
  * Downloads the weather data for the entire previous year
  * based on the current form address.
  * 
  * - Builds the full address from the form
  * - Calculates last year's date range
  * - Gets coordinates from geocoding service
  * - Fetches weather data for the date range
  * - Triggers JSON file download in the browser
  */
  downloadWeatherData(): void {
    const form = this.addressForm.value;

    // Compose the full address string
    const fullAddress = `${form.street}, ${form.zip} ${form.city}, ${form.province}, ${form.country}`;

    // Define start and end dates for the previous year
    const lastYear = new Date().getFullYear() - 1;
    const start = `${lastYear}-01-01`;
    const end = `${lastYear}-12-31`;

    // Get coordinates, then fetch weather data
    this.geocodingService.getCoordinates(fullAddress).pipe(
      switchMap(coords => 
        this.weatherService.getHistoricalWeather(coords.lat, coords.lng, start, end)
      )
    ).subscribe(data => {
      // Convert the weather data to a formatted JSON string
      const json = JSON.stringify(data, null, 2);

      // Create a downloadable blob
      const blob = new Blob([json], { type: 'application/json' });

      // Create a hidden link to trigger download
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `weather-${lastYear}.json`;
      a.click();

      // Clean up the object URL
      URL.revokeObjectURL(a.href);
    });
  }

  /**
  * Resets the address form and clears weather data.
  * 
  * - Clears form fields
  * - Resets any loaded weather data
  * - Stops any loading state
  */
  resetForm(): void {
    this.addressForm.reset();
    this.weatherData = null; 
    this.loading = false;
  }

}
