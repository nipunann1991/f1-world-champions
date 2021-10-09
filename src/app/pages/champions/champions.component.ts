import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Races, RaceTemplate, Winner } from './models/iChampionsTemplate';
import { ChampionsService } from './services/champions.service';

@Component({
  selector: 'app-champions',
  templateUrl: './champions.component.html',
  styleUrls: ['./champions.component.scss']
})
export class ChampionsComponent implements OnInit {

  startYear: number = 2005;
  currentYear: number = (new Date()).getFullYear();
  champYearList: Array<number> = [];
  seasonRacesList: Races[] = [];
  WorldChampionName: string = "";
  
  constructor(
    private champions: ChampionsService
  ) { }

  ngOnInit(): void {
    this.champYearList = this.rangeArray(this.startYear, this.currentYear);
    this.champions.getF1WorldChampion.subscribe((winner: any) => this.WorldChampionName = winner )
    this.getChampionshipResultsByYear(this.currentYear);
  }

  /* Set the seasons to an array. */
  rangeArray(start: number, end: number): Array<number>{
    return Array.from({length: (end - start + 1)}, (v, i) => i + start)
  }
  
  /* Get selected year from input and get the championship results based on the year. */
  selectedYear(event: Event){
    let year = (event.target as HTMLInputElement).value; 
    this.getChampionshipResultsByYear(parseInt(year));
  }

  /* Get championship results by year form calling the API. */
  getChampionshipResultsByYear(year: number){ 
    this.champions.getChampionshipResultsByYear(year).subscribe({
      next: (res: RaceTemplate) =>{ 
        this.seasonRacesList = res.MRData.RaceTable.Races;
      },
      error: err =>{
        console.log(err);
      }
    })
    
  } 

}
