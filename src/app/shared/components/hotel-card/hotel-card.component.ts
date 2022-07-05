import {Component, Input, OnInit} from '@angular/core';
import {Hotel} from "../../../models/hotel.model";
import {Price} from "../../../models/price.model";

@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.scss']
})
export class HotelCardComponent implements OnInit {
  panelOpenState = false;

  @Input() hotel!: Hotel
  @Input() price!: Price
  @Input() symbol!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
