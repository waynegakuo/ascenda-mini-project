import { Component, OnInit } from '@angular/core';
import { Currency } from "../../models/currency.model";

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
  constructor() { }

  ngOnInit(): void {
  }

}
