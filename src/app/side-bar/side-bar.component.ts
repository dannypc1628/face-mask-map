import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit, OnChanges {


  @Input()
  features;
  @Input()
  cityData;

  cityDataLoaded = false;
  areaList = [];
  select = { City: '台北市', Area: '中正區' };

  @Output()
  clickCardEvent = new EventEmitter();

  @Output()
  selectEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('cityData')) {
      if (this.cityDataLoaded === false) {
        this.areaList = this.cityData[0].AreaList;
        this.cityDataLoaded = true;
      }
    }
  }

  clickCard(coordinates) {
    console.log(coordinates);
    this.clickCardEvent.emit(coordinates);
  }
  changeCity($event) {
    const index = $event.target.value;
    this.areaList = this.cityData[index].AreaList;
    this.select.City = this.cityData[index].CityName;
    this.select.Area = this.areaList[0].AreaName;
    console.log('使用者選擇縣市：' + this.select.City + '系統預選地區：' + this.select.Area);
    this.selectEvent.emit(this.select);
  }
  changeArea($event) {
    const areaName = $event.target.value;
    this.select.Area = areaName;
    console.log('使用者選擇地區：' + this.select.City + this.select.Area);
    this.selectEvent.emit(this.select);
  }

}
