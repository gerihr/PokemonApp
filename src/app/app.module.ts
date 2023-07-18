import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { PokemonEffects } from './store/effects/pokemon.effects';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { DetailsComponent } from './details/details.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StartComponent } from './start/start.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzImageModule } from 'ng-zorro-antd/image';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PokemonCardComponent,
    DetailsComponent,
    StartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NzButtonModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NzCardModule,
    NzAvatarModule,
    NzImageModule,
    NzIconModule,
    NzModalModule,
    NzPageHeaderModule,
    EffectsModule.forRoot([PokemonEffects]),
    StoreModule.forRoot(
      reducers,
     {
       runtimeChecks: {
         strictStateImmutability: true,
         strictActionImmutability: true,
         strictActionSerializability: true,
         strictStateSerializability: true,
       },
     }
   ),  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
