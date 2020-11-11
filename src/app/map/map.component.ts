import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {
  map;

  @Input()
  features = [];

  @Input()
  center = [];

  markersObj = {};
  icons = {
    green: '',
    gold: '',
    orange: '',
    red: '',
    grey: ''
  };
  tiles;
  constructor() { }

  ngOnInit(): void {
    this.map = L.map('map', { center: [25.0249211, 121.5075035], zoom: 15 });
    this.tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    this.tiles.addTo(this.map);

    const greenIcon = L.icon({
      iconUrl: 'assets/icon/marker-icon-green.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    const goldIcon = L.icon({
      iconUrl: 'assets/icon/marker-icon-gold.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    const orangeIcon = L.icon({
      iconUrl: 'assets/icon/marker-icon-orange.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    const redIcon = L.icon({
      iconUrl: 'assets/icon/marker-icon-red.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    const greyIcon = L.icon({
      iconUrl: 'assets/icon/marker-icon-grey.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    this.icons.green = greenIcon;
    this.icons.gold = goldIcon;
    this.icons.red = redIcon;
    this.icons.grey = greyIcon;
    this.icons.orange = orangeIcon;
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes.hasOwnProperty('features'));
    if (changes.hasOwnProperty('features')) {
      if (this.features.length > 0) {
        this.features.forEach(element => {
          this.addMarker(element);
        });
      }
    }
    if (changes.hasOwnProperty('center')) {
      this.map.panTo(this.center);
      const key = this.center[0] + this.center[1];
      const marker = this.markersObj[key];
      marker.openPopup();
      this.map.setZoomAround(this.center, 16);
    }
  }


  addMarker(item) {
    const marker = L
      .marker([item.geometry.coordinates[1], item.geometry.coordinates[0]], { icon: this.getColorIcon(item), title: item.properties.name })
      .addTo(this.map)
      .bindPopup(item.properties.name +
        '<br>成人口罩：' + item.properties.mask_adult +
        '<br>兒童口罩：' + item.properties.mask_child
      );
    const key = item.geometry.coordinates[1] + item.geometry.coordinates[0];
    this.markersObj[key] = marker;
  }

  getColorIcon(item) {
    const mask_adult = item.properties.mask_adult;
    const mask_child = item.properties.mask_child;
    // 成人口罩大於60與兒童口罩大於0為綠色
    if (mask_adult >= 60 && mask_child > 0) {
      return this.icons.green;
    }
    // 成人口罩大於0小於60與兒童口罩大於0為黃色
    if ((mask_adult > 0 && mask_adult < 60) && mask_child > 0) {
      return this.icons.gold;
    }
    // 僅剩兒童口罩為橘色
    if (mask_adult === 0 && mask_child > 0) {
      return this.icons.orange;
    }
    // 全無口罩為灰色
    if (mask_adult === 0 && mask_child === 0) {
      return this.icons.grey;
    }
    // 數量未知或僅剩成人口罩而無兒童口罩為紅色
    return this.icons.red;

  }

}
