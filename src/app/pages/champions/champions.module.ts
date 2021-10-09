import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChampionsRoutingModule } from './champions-routing.module';
import { ChampionsComponent } from './champions.component';
import { RacesModule } from '../races/races.module'; 


@NgModule({
  declarations: [
    ChampionsComponent
  ],
  imports: [
    CommonModule,
    ChampionsRoutingModule,
    RacesModule,
  ],
  exports: [ChampionsComponent]
})
export class ChampionsModule { }
