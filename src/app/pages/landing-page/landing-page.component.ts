import { Component, OnInit } from '@angular/core';
import { Currency } from "../../models/currency.model";
import {HotelService} from "../../services/hotel/hotel.service";
import {Hotel} from "../../models/hotel.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  hotels$: Observable<Hotel[]> = this.hotelService.getHotels();
  // hotels$!: Observable<Hotel[]>;

  currencies: Currency[] = [
    {
      name: 'USD',
      value: 'USD',
    },
    {
      name: 'SGD',
      value: 'SGD',
    },
    {
      name: 'CNY',
      value: 'CNY',
    },
    {
      name: 'KRW',
      value: 'KRW',
    }
  ];
  constructor(private hotelService: HotelService) { }

  ngOnInit(): void {
  }

}
