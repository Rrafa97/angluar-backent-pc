import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  url: string = 'http://localhost:3000/locations'

  submitApplication(firstName: string, lastName: string, email: String) {
    console.log(`Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`);
  }

  constructor() { }

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const data = await fetch(this.url);
    return await data.json() ?? []
  }

  getAllHousingLocation(): HousingLocation[] {
    return this.housingLocationList;
  }

   async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {}
  }

  getAvailableHousingLocations(): HousingLocation[] {
    return this.housingLocationList;
  }
  housingLocationList: HousingLocation[] = [];
}
