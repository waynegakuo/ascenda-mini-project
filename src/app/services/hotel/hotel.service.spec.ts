import {TestBed, tick} from '@angular/core/testing';

import {HotelService} from './hotel.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HOTELS_DATA_STUB} from "./hotel.data.stub";
import {of, throwError} from "rxjs";
import {error} from "@angular/compiler-cli/src/transformers/util";

describe('HotelService', () => {
  let service: HotelService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HotelService]
    });
    service = TestBed.inject(HotelService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all hotels', done => {
    jest.spyOn(service, 'getHotels').mockReturnValue(of(HOTELS_DATA_STUB));
    service.getHotels()
      .subscribe(hotels => {
        expect(hotels).toBeTruthy();
        expect(hotels.length).toEqual(2);
        done();
      });
    expect(service.getHotels).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if hotel data is not found', done => {
    jest.spyOn(service, 'getHotels').mockReturnValue(throwError(() =>'Cannot find hotels'));
    service.getHotels()
      .subscribe({
        error: err => {
          expect(err).toEqual('Cannot find hotels');
          done();
        }
      });
    expect(service.getHotels).toHaveBeenCalledTimes(1);
  })

  it('should get hotel data', () => {
    jest.spyOn(service, 'getHotels');

  })
});
