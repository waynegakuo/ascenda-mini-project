import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, throwError} from "rxjs";
import {Hotel} from "../../models/hotel.model";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  hotelsApiUrl = 'https://5df9cc6ce9f79e0014b6b3dc.mockapi.io/hotels/tokyo';

  constructor(private http: HttpClient) { }

  getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.hotelsApiUrl)
      .pipe(
        catchError(() => {
          return throwError(() => 'Cannot find hotels');
        })
      );
  }
}
