import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mapproject';
  data: any;
  cityData;
  features = [];
  center = [];
  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json')
      .subscribe((value: any) => {
        this.data = value;
        console.log(this.data);
        this.features = value.features;
      });
    this.http.get('/assets/CityCountyData.json')
      .subscribe((value: any) => {
        this.cityData = value;
        console.log(value);
      });
  }

  changeMapCenter(coordinates) {
    this.center = [coordinates[1], coordinates[0]];
  }
}
