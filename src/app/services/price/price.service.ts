import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Price} from "../../models/price.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  priceApiUrl = 'http://5df9cc6ce9f79e0014b6b3dc.mockapi.io/hotels/tokyo/1/'

  constructor(private http: HttpClient) { }

  getPrice(currency: string): Observable<Price[]> {
    return this.http.get<Price[]>(this.priceApiUrl + currency);
  }
}

