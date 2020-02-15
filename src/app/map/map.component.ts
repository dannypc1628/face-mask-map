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

  tiles;
  constructor() { }

  ngOnInit(): void {
    this.map = L.map('map', { center: [22.604799, 120.2976256], zoom: 16 });
    this.tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    this.tiles.addTo(this.map);

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
    }
  }


  addMarker(item) {
    const marker = L
      .marker([item.geometry.coordinates[1], item.geometry.coordinates[0]])
      .addTo(this.map)
      .bindPopup(item.properties.name +
        '<br>成人口罩：' + item.properties.mask_adult +
        '<br>兒童口罩：' + item.properties.mask_child
      );
    const key = item.geometry.coordinates[1] + item.geometry.coordinates[0];
    this.markersObj[key] = marker;
  }

}
