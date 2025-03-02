import { Component, inject } from '@angular/core';
import {HousingService} from '../housing.service';
import {HousingLocation} from '../housinglocation';

@Component({
  selector: 'app-details',
  imports: [],
  template: ``,
  styleUrls: ['./details.component.css'],
})

export class DetailsComponent {
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;

  constructor() {
    const housingLocationId = -1;
    this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
  }

}