import { Component, OnInit } from '@angular/core';
import { Currency } from "../../models/currency.model";
import {HotelService} from "../../services/hotel/hotel.service";
import {Hotel} from "../../models/hotel.model";
import {BehaviorSubject, Observable} from "rxjs";
import {AbstractControl, FormBuilder, ValidationErrors, Validators} from "@angular/forms";
import {PriceService} from "../../services/price/price.service";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  currencies: Currency[] = [
    {
      name: 'USD',
      value: 'USD',
      isSelected: true,
    },
    {
      name: 'SGD',
      value: 'SGD',
      isSelected: false,
    },
    {
      name: 'CNY',
      value: 'CNY',
      isSelected: false,
    },
    {
      name: 'KRW',
      value: 'KRW',
      isSelected: false,
    }
  ];
  hotels$: Observable<Hotel[]> = this.hotelService.getHotels();
  // hotels$!: Observable<Hotel[]>;

  prices: any;

  currencyForm = this.fb.group({
    currency: ['', Validators.required]
  })

  currencyValue$: BehaviorSubject<any> = new BehaviorSubject<{currency: string | null}>
  ({currency: 'USD'});

  constructor(private hotelService: HotelService, private fb: FormBuilder, private priceService: PriceService) { }
  ngOnInit(): void {
    // console.log('check currency value', this.currencyValue$.value);

    // this.prices = this.priceService.getPrice(this.currencyValue$.value['currency']);
    //
    // this.prices.subscribe( (x: any) => {
    //   console.log(x)
    // })

  }

  onCurrencyOptionSelected(currencyValue: Event){
    this.currencyValue$.next({currency: (currencyValue.target as HTMLInputElement).value});
    // console.log('check currency value', this.currencyValue$.value['currency']);

    // Trigger the change of price and reload the hotel items with the new details
  }

}
