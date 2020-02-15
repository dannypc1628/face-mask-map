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
  }

  changeMapCenter(coordinates) {
    this.center = [coordinates[1], coordinates[0]];
  }
}
