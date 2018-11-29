import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { error } from 'util';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[];
  public cacheForecasts: WeatherForecast[];
  public summaries: any[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<WeatherForecast[]>(baseUrl + 'api/SampleData/WeatherForecasts').subscribe(result => {
      this.forecasts = result;
      this.cacheForecasts = this.forecasts;
    }, error => console.error(error));
    http.get(baseUrl + 'api/SampleData/GetSummaries').subscribe(x => {
      this.summaries = x as any[];
    }, error => console.error(error));
  }

  filterForeCasts(filterVal: any) {
    if (filterVal == "0")
      this.forecasts = this.cacheForecasts;
    else
      this.forecasts = this.cacheForecasts.filter((item) => item.summary == filterVal);
  }
}

interface WeatherForecast {
  dateFormatted: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

interface Summary {
  name: string;
}
