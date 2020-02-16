import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';

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
  localFeatures = [];
  center = [];
  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json')
      .subscribe((value: any) => {
        this.data = value;
        console.log(this.data);
        this.features = value.features;
        this.localFeatures = value.features;
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

  selectLocationData(location) {
    console.log('使用者選擇:' + location.City + location.Area);
    const loclStr: string = location.City + location.Area;
    this.localFeatures = this.features.filter(item =>
      item.properties.address.substring(0, loclStr.length) === loclStr);
  }
}
