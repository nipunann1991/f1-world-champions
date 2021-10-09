import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RaceTemplate, Winner } from '../models/iChampionsTemplate';

const F1WC_API = environment.ERGAST_F1WC_API;

@Injectable({
  providedIn: 'root'
})
export class ChampionsService {

  private worldChampion = new Subject();
  getF1WorldChampion = this.worldChampion.asObservable();

  constructor(private http: HttpClient) { }

  getChampionshipResultsByYear(year: number): Observable<RaceTemplate>{
    return this.http.get<RaceTemplate>(F1WC_API + `${year}/results/1.json`);
  }

  getWinnersByRace(year: number, round: number): Observable<RaceTemplate>{
    return this.http.get<RaceTemplate>(F1WC_API + `${year}/${round}/results.json?limit=3`);
  }
  
  /// Set F1 World champion name to the parent component.  
  setF1WorldChampion(winner: string){
    this.worldChampion.next(winner);
  }

}
