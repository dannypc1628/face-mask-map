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

  @Output()
  clickCardEvent = new EventEmitter();

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
    this.areaList = this.cityData[$event.target.value].AreaList;
  }

}
