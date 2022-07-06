import {Component, OnDestroy, OnInit} from '@angular/core';
import {Currency} from "../../models/currency.model";
import {HotelService} from "../../services/hotel/hotel.service";
import {Hotel} from "../../models/hotel.model";
import {BehaviorSubject, Observable} from "rxjs";
import {FormBuilder, Validators} from "@angular/forms";
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

  currencyValue: string = JSON.parse(String(localStorage.getItem('selectedCurrency')))

  // Default Currency is USD
  currencyForm = this.fb.group({
    currency: [this.currencyValue, Validators.required]
  })

  // Default Currency Value
  currencyValue$: BehaviorSubject<{currency: string | null}> = new BehaviorSubject<{currency: string | null}>
  ({currency: this.currencyForm.controls.currency.value});

  constructor(private hotelService: HotelService, private fb: FormBuilder, private priceService: PriceService) { }

  ngOnInit(): void {
    this.storageChecker();
    this.prices$ = this.priceService.getPrice(this.currencyValue);
    this._updateCurrencySymbol(this.currencyValue);
    this._updateCurrencyValue(this.currencyValue);
  }

  /**
   * Checks the local storage for previously selected currency
   * sets the currency to 'US' if no currency selection found
   * @return string
   */
  storageChecker(): string {
    if(localStorage.getItem('selectedCurrency') === null){
      localStorage.setItem('selectedCurrency', JSON.stringify('USD'));
      this.currencyValue = JSON.parse(String(localStorage.getItem('selectedCurrency')));
      this.currencyForm.controls.currency.setValue(this.currencyValue);
    }
    return this.currencyValue
  }

  /**
   * Updates the currency selection via the dropdown selected changes
   * triggers price change to render to view
   * updates the currency symbols and currency value to be stored in local storage
   * @param currencyValue
   */
  onCurrencyOptionSelected(currencyValue: Event){
    this.currencyValue$.next({currency: (currencyValue.target as HTMLInputElement).value});
    this.prices$ = this.priceService.getPrice(this.currencyValue$.value['currency']);
    this._updateCurrencySymbol(this.currencyValue$.value['currency']);
    this._updateCurrencyValue(this.currencyValue$.value['currency']);
  }

  /**
   * Updates the currency symbol to be shown in the UI
   * @param currencySelected
   * @private
   */
  private _updateCurrencySymbol(currencySelected: string | null): string {
    this.filteredCurrency = this.currencies
      .filter(selectedCurrency => currencySelected === selectedCurrency.value);
    this.currencySymbol = this.filteredCurrency[0].symbol;
    return this.currencySymbol;
  }

  /**
   * Updates the currency value and updates the localStorage currency value item
   * @param currencySelected
   * @private
   */
  private _updateCurrencyValue(currencySelected: string | null) {
    localStorage.setItem('selectedCurrency', JSON.stringify(currencySelected));
    this.currencyValue = JSON.parse(String(localStorage.getItem('selectedCurrency')))
    return this.currencyValue;
  }

  ngOnDestroy() {
    this.currencyValue$.next({currency: null});
    this.currencyValue$.complete();
  }

}
