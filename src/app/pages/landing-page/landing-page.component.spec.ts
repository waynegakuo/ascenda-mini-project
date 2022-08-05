import {ComponentFixture, fakeAsync, flushMicrotasks, inject, TestBed, tick} from '@angular/core/testing';

import { LandingPageComponent } from './landing-page.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormBuilder} from "@angular/forms";
import {DebugElement, NO_ERRORS_SCHEMA} from "@angular/core";
import {HotelService} from "../../services/hotel/hotel.service";
import {of} from "rxjs";
import {HOTELS_DATA_STUB} from "../../services/hotel/hotel.data.stub";
import {By} from "@angular/platform-browser";

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;
  let hotelService: HotelService;
  let el: DebugElement;

  let mockHotelService = {
    getHotels: jest.fn()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingPageComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        FormBuilder,
        {
          provide: HotelService,
          useValue: mockHotelService
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    hotelService = TestBed.inject(HotelService)
    el = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Service injected via inject(...) and TestBed.get(...) should be the same instance',
    inject([HotelService], (injectService: HotelService) => {
      const service = TestBed.inject(HotelService);
      expect(injectService).toBe(service);
    })
  );

  it('should render the card section if data available',() => {
    jest.spyOn(mockHotelService, 'getHotels').mockReturnValue(of(HOTELS_DATA_STUB));
    fixture.detectChanges();

    const hotelCardSection = el.queryAll(By.css('.hotels-section'));
    expect(hotelCardSection.length).toBe(1);

  });

  it('should have USD selected as the default currency', () => {
    const defaultCurrency = 'USD';
    component.currencyForm.get('currency')?.setValue(defaultCurrency);

    expect(component.currencyForm.controls.currency.value).toEqual('USD');
  })

  it('should change the value on selection change', () => {
    fixture.detectChanges();
    const select: HTMLSelectElement = el.query(By.css('.form-control-dropdown')).nativeElement;
    select.value = select.options[1].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(select.value).toEqual('SGD');

  })

  it('should trigger price change when a currency selection has been changed', () => {
    jest.spyOn(component, 'onCurrencyOptionSelected');

    const select: HTMLSelectElement = el.query(By.css('.form-control-dropdown')).nativeElement;
    select.value = select.options[2].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.onCurrencyOptionSelected).toHaveBeenCalled();
    expect(component.onCurrencyOptionSelected).toHaveBeenCalledTimes(1);

  })
});
