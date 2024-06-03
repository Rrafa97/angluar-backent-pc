import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';
import { HousingLocationComponent } from '../housing-location/housing-location.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,HousingLocationComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter my city" #filter>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section>
      <app-housing-location *ngFor="let housingLocation of filterLocationList" [housingLocation]="housingLocation"></app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filterLocationList: HousingLocation[] = [];


  constructor() {

  this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
    this.housingLocationList = housingLocationList;
    this.filterLocationList = housingLocationList;
  })

  }

  filterResults(text: string) {
    if (!text) {
      this.filterLocationList = this.housingLocationList;
    }
    console.log('==', this.housingLocationList.filter(housingLocation => housingLocation?.city?.toLowerCase().includes(text.toLowerCase())))

    this.filterLocationList = this.housingLocationList.filter(housingLocation => housingLocation?.city?.toLowerCase().includes(text.toLowerCase()));
  }
}
