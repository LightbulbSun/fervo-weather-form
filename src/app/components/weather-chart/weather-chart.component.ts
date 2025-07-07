import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'fervo-weather-chart',
  templateUrl: './weather-chart.component.html',
  styleUrls: ['./weather-chart.component.scss']
})
export class WeatherChartComponent implements OnChanges {
  /**
 * Input property to receive weather data from the parent component.
 * Expected to contain arrays for date, tempMax, and tempMin.
 */
@Input() weatherData: any;

/**
 * Chart configuration for ECharts.
 * Will be dynamically populated in `updateChart()`.
 */
chartOptions: any = {};

/**
 * Lifecycle hook called whenever input properties change.
 * When new weather data is received, update the chart.
 */
ngOnChanges(): void {
  if (this.weatherData) {
    this.updateChart(this.weatherData);
  }
}

/**
 * Updates the ECharts configuration using the provided weather data.
 *
 * @param data - The weather data containing date, tempMax, and tempMin arrays.
 */
updateChart(data: any): void {
  this.chartOptions = {
    title: { text: 'Temperature giornaliere' }, // Chart title
    tooltip: { trigger: 'axis' },               // Tooltip shows on axis hover
    legend: { data: ['Max', 'Min'] },           // Legend for the two series
    xAxis: {
      type: 'category',
      data: data.date                           // X-axis: list of dates
    },
    yAxis: {
      type: 'value',
      name: 'Temperatura (°C)'                  // Y-axis: temperature in °C
    },
    series: [
      {
        name: 'Max',
        type: 'line',
        data: data.tempMax                      // Line series for max temps
      },
      {
        name: 'Min',
        type: 'line',
        data: data.tempMin                      // Line series for min temps
      }
    ]
  };
}
}
