import { Component, OnInit, Input, OnChanges } from '@angular/core';
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

  ngOnChanges(): void {
    console.log(this.features);
    if (this.features.length > 0) {
      this.features.forEach(element => {
        this.addMarker(element);
      });
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
  }

}
