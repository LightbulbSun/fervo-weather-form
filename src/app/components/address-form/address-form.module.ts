import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddressFormComponent } from "./address-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { GeocodingService } from "src/app/services/geocoding.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { WeatherService } from "src/app/services/weather.service";
import { WeatherChartComponent } from "../weather-chart/weather-chart.component";
import { NgxEchartsModule } from "ngx-echarts";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpLoaderFactory } from "src/app/app.module";

@NgModule({
  declarations: [AddressFormComponent, WeatherChartComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    TranslateModule.forRoot({
          defaultLanguage: 'it',
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
  ],
  exports: [AddressFormComponent], 
  entryComponents: [AddressFormComponent, WeatherChartComponent ],
  providers: [GeocodingService, WeatherService]
})
export class AddressFormModule { }