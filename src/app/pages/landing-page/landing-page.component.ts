import {Component, OnDestroy, OnInit} from '@angular/core';
import { Currency } from "../../models/currency.model";
import {HotelService} from "../../services/hotel/hotel.service";
import {Hotel} from "../../models/hotel.model";
import {BehaviorSubject, map, Observable, switchMap, take} from "rxjs";
import {AbstractControl, FormBuilder, ValidationErrors, Validators} from "@angular/forms";
import {PriceService} from "../../services/price/price.service";
import {Price} from "../../models/price.model";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, OnDestroy {
  currencies: Currency[] = [
    {
      name: 'USD',
      value: 'USD',
      symbol: '$'
    },
    {
      name: 'SGD',
      value: 'SGD',
      symbol: 'S$'
    },
    {
      name: 'CNY',
      value: 'CNY',
      symbol: '¥'
    },
    {
      name: 'KRW',
      value: 'KRW',
      symbol: '₩'
    }
  ];

  hotels$: Observable<Hotel[]> = this.hotelService.getHotels();

  prices$!: Observable<Price[]>;

  filteredCurrency!: Currency[];
  currencySymbol!: string;

  // Default Currency is USD
  currencyForm = this.fb.group({
    currency: ['USD', Validators.required]
  })

  // Default Currency Value
  currencyValue$: BehaviorSubject<{currency: string | null}> = new BehaviorSubject<{currency: string | null}>
  ({currency: 'USD'});

  constructor(private hotelService: HotelService, private fb: FormBuilder, private priceService: PriceService) { }

  ngOnInit(): void {
    this.prices$ = this.priceService.getPrice(this.currencyValue$.value['currency']);
    this._updateCurrencySymbol(this.currencyValue$.value['currency']);
  }

  onCurrencyOptionSelected(currencyValue: Event){
    this.currencyValue$.next({currency: (currencyValue.target as HTMLInputElement).value});
    this.prices$ = this.priceService.getPrice(this.currencyValue$.value['currency']);
    this._updateCurrencySymbol(this.currencyValue$.value['currency']);
  }

  private _updateCurrencySymbol(currencySelected: string | null): string {
    this.filteredCurrency = this.currencies
      .filter(selectedCurrency => currencySelected === selectedCurrency.value);
    this.currencySymbol = this.filteredCurrency[0].symbol
    return this.currencySymbol;
  }

  ngOnDestroy() {
    this.currencyValue$.next({currency: null});
    this.currencyValue$.complete();
  }

}
