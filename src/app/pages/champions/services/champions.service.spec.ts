import { HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { ChampionsService } from "./champions.service";

describe("ChampionsService", () => {
  let service: ChampionsService;
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [ChampionsService]
    }); 
 
    service = TestBed.inject(ChampionsService); 
  });

   it('should create ChampionsService', inject([ChampionsService], (champions: ChampionsService)=>{
      expect(champions).toBeTruthy();
   }))
 
  it('should get the championship results by year', (done: DoneFn) => {
    let year = 2005
    service.getChampionshipResultsByYear(year).subscribe((post) => { 
      expect(post.MRData.RaceTable.season).toEqual(year.toString());
      done();
    });
  });
   
  it('should get the winner by race', (done: DoneFn) => {
    let data = { year: 2005, round: 1}
    service.getWinnersByRace(data.year, data.round).subscribe((post) => { 
      expect(post.MRData.RaceTable.season).toEqual(data.year.toString())
      expect(post.MRData.RaceTable.round).toEqual(data.round.toString())
      done();
    });
  });
  
});
