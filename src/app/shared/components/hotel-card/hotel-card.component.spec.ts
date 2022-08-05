import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelCardComponent } from './hotel-card.component';
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {PriceEvaluationPipe} from "../../../pipes/price-evaluation.pipe";
import {HOTELS_DATA_STUB} from "../../../services/hotel/hotel.data.stub";
import {MatIconTestingModule} from "@angular/material/icon/testing";
import {MatIconModule} from "@angular/material/icon";
import {PRICE_DATA_SUB} from "../../../services/price/price.data.stub";
import {MatExpansionModule} from "@angular/material/expansion";
import {CustomTooltipDirective} from "../../../directives/custom-tooltip.directive";
import {Overlay} from "@angular/cdk/overlay";
import {CustomTooltipComponent} from "../custom-tooltip/custom-tooltip.component";
import {MatTooltipModule} from "@angular/material/tooltip";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('HotelCardComponent', () => {
  let component: HotelCardComponent;
  let fixture: ComponentFixture<HotelCardComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatIconTestingModule,
        MatIconModule,
        MatExpansionModule,
        MatTooltipModule
      ],
      declarations: [
        HotelCardComponent,
        PriceEvaluationPipe,
        CustomTooltipDirective,
        CustomTooltipComponent,
      ],
      providers: [
        Overlay
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelCardComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    component.hotel = HOTELS_DATA_STUB[0];
    component.price = PRICE_DATA_SUB[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show hotel data', () => {
    expect(component.hotel).toBeTruthy();
  });

  it('should display the hotel card when hotel and price data is available', () => {
    const hotel = el.queryAll(By.css('hotel-card'));
    expect(hotel).toBeTruthy();
  })
});
