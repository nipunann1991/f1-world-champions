import { RouterTestingModule } from '@angular/router/testing'
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ChampionsComponent } from "./champions.component";
import { HttpClientModule } from '@angular/common/http';
import { RacesComponent } from '../races/races.component';
import { ChampionsService } from './services/champions.service';


describe("ChampionsComponent", () => {   
  let fixture: any;
  let app: any
  let component: ChampionsComponent;
  let service: ChampionsService

  beforeEach(async () => {
     
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: [
        ChampionsComponent,
        RacesComponent
      ],
    }).compileComponents().then(()=>{
        component = new ChampionsComponent(service)
        fixture = TestBed.createComponent(ChampionsComponent);
        app = fixture.debugElement.componentInstance;
    });
  });


  it('should have the start year equals 2005 as default', ()=>{  
    expect(app.startYear).toEqual(2005); 
  })

  it('should have the current year as 2021', ()=>{ 
    expect(app.currentYear).toEqual(2021);

  }) 
  
  it('should include the RacesComponent', ()=>{
    let fixtureRaces = TestBed.createComponent(RacesComponent);
    let app = fixtureRaces.debugElement.componentInstance;
    expect(app).toBeTruthy();

  })

  it('should call rangeArray function return a number array of years', ()=>{
    expect(app.rangeArray(2005,2008)).toEqual([2005,2006,2007,2008]);
  })
  
})