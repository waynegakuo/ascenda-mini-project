import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {NavbarComponent} from './shared/components/navbar/navbar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {LandingPageComponent} from './pages/landing-page/landing-page.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HotelCardComponent} from './shared/components/hotel-card/hotel-card.component';
import {HttpClientModule} from "@angular/common/http";
import {MatExpansionModule} from "@angular/material/expansion";
import { GhostHotelCardComponent } from './shared/ghost-components/ghost-hotel-card/ghost-hotel-card.component';
import {PriceEvaluationPipe} from "./pipes/price-evaluation.pipe";
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingPageComponent,
    HotelCardComponent,
    GhostHotelCardComponent,
    PriceEvaluationPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatExpansionModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
