import { Component, inject } from '@angular/core';
import {HousingService} from '../housing.service';
import {HousingLocation} from '../housinglocation';

@Component({
  selector: 'app-details',
  imports: [],
  template: `<p>details works!</p>`,
  styleUrls: ['./details.component.css'],
})

export class DetailsComponent {
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  housingLocationId = -1;

  constructor() {
    
  }

}