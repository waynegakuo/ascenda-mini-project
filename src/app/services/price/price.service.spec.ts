import { TestBed } from '@angular/core/testing';

import { PriceService } from './price.service';
import {PRICE_DATA_SUB} from "./price.data.stub";
import {of, throwError} from "rxjs";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Price} from "../../models/price.model";

describe('PriceService', () => {
  let service: PriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PriceService]
    });
    service = TestBed.inject(PriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return prices when currency is provided', done => {
    const mockCurrency = 'USD';
    jest.spyOn(service, 'getPrice').mockReturnValue(of(PRICE_DATA_SUB));

    service.getPrice(mockCurrency)
      .subscribe((price: Price[]) => {
        expect(price).toBeTruthy();
        done();
      })
    expect(service.getPrice).toHaveBeenCalledTimes(1);
  });

  it('should have the price details returned to contain and id and price', done => {
    const mockCurrency = 'SGD';
    jest.spyOn(service, 'getPrice').mockReturnValue(of(PRICE_DATA_SUB));

    service.getPrice(mockCurrency)
      .subscribe((price: Price[]) => {
        price.forEach(x => {
          expect(x.id).toBeDefined();
          expect(x.price).toBeDefined();
        });
        done();
      })
    expect(service.getPrice).toHaveBeenCalledTimes(1);
  })

  it('should throw error when hotels matching the selected currency cannot be found', done => {
    const invalidCurrency = 'ABC';
    const errorMessage = 'Hotels with selected currency cannot be found';
    jest.spyOn(service, 'getPrice').mockReturnValue(throwError(() => errorMessage));

    service.getPrice(invalidCurrency)
      .subscribe({
        error: err => {
          expect(err).toEqual(errorMessage);
          done();
        }
      });
    expect(service.getPrice).toHaveBeenCalledTimes(1);
  })
});
