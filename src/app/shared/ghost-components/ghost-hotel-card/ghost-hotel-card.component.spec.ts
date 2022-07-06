import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GhostHotelCardComponent } from './ghost-hotel-card.component';

describe('GhostHotelCardComponent', () => {
  let component: GhostHotelCardComponent;
  let fixture: ComponentFixture<GhostHotelCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GhostHotelCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GhostHotelCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
