import { Component, Input, OnInit } from '@angular/core';
import { Races, RaceTemplate, Winner } from '../champions/models/iChampionsTemplate';
import { ChampionsService } from '../champions/services/champions.service';

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.scss'],
})
export class RacesComponent implements OnInit {

  @Input() seasonRacesList: Races[] = [];
  worldChampion!: Winner;
  openModalBox: boolean = false;
  isDataLoading: boolean = false;
  winnersList!: Races;

  constructor(
    private champion: ChampionsService
  ) { }

  ngOnInit(): void {
   
  }

  ngOnChanges() {
    this.getWorldChampion();
  }
  
  /* Get the world champion through the race winners list. */
  getWorldChampion(){ 
    let raceWinnersList: Array<Winner> = []; 
    this.seasonRacesList?.filter((x: Races) => raceWinnersList.push({ code: x.Results[0].Driver.code, name: x.Results[0].Driver.givenName + " " + x.Results[0].Driver.familyName }) ); 
   
    this.worldChampion = raceWinnersList.sort((a:any,b:any) => {
      return raceWinnersList.filter((v: Winner) => v.code === a.code).length - raceWinnersList.filter((v:Winner) => v.code === b.code).length
    }).pop() || { name: '', code: '' };  

    this.champion.setF1WorldChampion(this.worldChampion.name);
  }

  /* Get the winners by race through the API. */ 
  getWinnersByRound(index: number){
    this.openModalBox = true; 
    this.isDataLoading = true;

    let data = { year: parseInt(this.seasonRacesList[index].season), round: parseInt(this.seasonRacesList[index].round)  };
    this.champion.getWinnersByRace(data.year, data.round).subscribe({
      next: (res: RaceTemplate) =>{ 
        this.winnersList = res.MRData.RaceTable.Races[0];
        this.isDataLoading = false;
      },
      error: err =>{
        console.log(err);
      }
    })
  }

  closeModalBox(){
    this.openModalBox = false;
  }

}
