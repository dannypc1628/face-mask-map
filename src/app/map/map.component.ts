import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css', ]
})
export class MapComponent implements OnInit {
  map;
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

}
