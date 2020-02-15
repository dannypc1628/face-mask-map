import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  @Input()
  features;

  @Output()
  clickCardEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  clickCard(coordinates) {
    console.log(coordinates);
    this.clickCardEvent.emit(coordinates);
  }

}
