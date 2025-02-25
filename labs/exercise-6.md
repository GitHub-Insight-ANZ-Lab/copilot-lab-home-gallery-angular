
# Exercise 6: Add HTTP communication to your app

This tutorial demonstrates how to integrate HTTP and an API into your app.

Up until this point your app has read data from a static array in an Angular service. The next step is to use a JSON server that your app will communicate with over HTTP. The HTTP request will simulate the experience of working with data from a server.

## Configure the JSON server

JSON Server is an open source tool used to create mock REST APIs. You'll use it to serve the housing location data that is currently stored in the housing service.

Install json-server from npm by using the following command.

```
npm install -g json-server
```

the root directory of your project, create a file called db.json. This is where you will store the data for the json-server.

Open db.json and copy the following code into the file

```
{
         "locations": [
             {
                 "id": 0,
                 "name": "Acme Fresh Start Housing",
                 "city": "Chicago",
                 "state": "IL",
                 "photo": "https://angular.dev/assets/images/tutorials/common/bernard-hermant-CLKGGwIBTaY-unsplash.jpg",
                 "availableUnits": 4,
                 "wifi": true,
                 "laundry": true
             },
             {
                 "id": 1,
                 "name": "A113 Transitional Housing",
                 "city": "Santa Monica",
                 "state": "CA",
                 "photo": "https://angular.dev/assets/images/tutorials/common/brandon-griggs-wR11KBaB86U-unsplash.jpg",
                 "availableUnits": 0,
                 "wifi": false,
                 "laundry": true
             },
             {
                 "id": 2,
                 "name": "Warm Beds Housing Support",
                 "city": "Juneau",
                 "state": "AK",
                 "photo": "https://angular.dev/assets/images/tutorials/common/i-do-nothing-but-love-lAyXdl1-Wmc-unsplash.jpg",
                 "availableUnits": 1,
                 "wifi": false,
                 "laundry": false
             },
             {
                 "id": 3,
                 "name": "Homesteady Housing",
                 "city": "Chicago",
                 "state": "IL",
                 "photo": "https://angular.dev/assets/images/tutorials/common/ian-macdonald-W8z6aiwfi1E-unsplash.jpg",
                 "availableUnits": 1,
                 "wifi": true,
                 "laundry": false
             },
             {
                 "id": 4,
                 "name": "Happy Homes Group",
                 "city": "Gary",
                 "state": "IN",
                 "photo": "https://angular.dev/assets/images/tutorials/common/krzysztof-hepner-978RAXoXnH4-unsplash.jpg",
                 "availableUnits": 1,
                 "wifi": true,
                 "laundry": false
             },
             {
                 "id": 5,
                 "name": "Hopeful Apartment Group",
                 "city": "Oakland",
                 "state": "CA",
                 "photo": "https://angular.dev/assets/images/tutorials/common/r-architecture-JvQ0Q5IkeMM-unsplash.jpg",
                 "availableUnits": 2,
                 "wifi": true,
                 "laundry": true
             },
             {
                 "id": 6,
                 "name": "Seriously Safe Towns",
                 "city": "Oakland",
                 "state": "CA",
                 "photo": "https://angular.dev/assets/images/tutorials/common/phil-hearing-IYfp2Ixe9nM-unsplash.jpg",
                 "availableUnits": 5,
                 "wifi": true,
                 "laundry": true
             },
             {
                 "id": 7,
                 "name": "Hopeful Housing Solutions",
                 "city": "Oakland",
                 "state": "CA",
                 "photo": "https://angular.dev/assets/images/tutorials/common/r-architecture-GGupkreKwxA-unsplash.jpg",
                 "availableUnits": 2,
                 "wifi": true,
                 "laundry": true
             },
             {
                 "id": 8,
                 "name": "Seriously Safe Towns",
                 "city": "Oakland",
                 "state": "CA",
                 "photo": "https://angular.dev/assets/images/tutorials/common/saru-robert-9rP3mxf8qWI-unsplash.jpg",
                 "availableUnits": 10,
                 "wifi": false,
                 "laundry": false
             },
             {
                 "id": 9,
                 "name": "Capital Safe Towns",
                 "city": "Portland",
                 "state": "OR",
                 "photo": "https://angular.dev/assets/images/tutorials/common/webaliser-_TPTXZd9mOo-unsplash.jpg",
                 "availableUnits": 6,
                 "wifi": true,
                 "laundry": true
             }
         ]
     }

```

Save this file.

Time to test your configuration. From the command line, at the root of your project run the following commands.

```
json-server --watch db.json
```

In your web browser, navigate to the http://localhost:3000/locations and confirm that the response includes the data stored in db.json.

## Update service to use web server instead of local array

The data source has been configured, the next step is to update your web app to connect to it use the data.

In src/app/housing.service.ts, make the following changes:

Update the code to remove housingLocationList property and the array containing the data.

Add a string property called url and set its value to 'http://localhost:3000/locations'

```
url = 'http://localhost:3000/locations';
```

This code will result in errors in the rest of the file because it depends on the housingLocationList property. We're going to update the service methods next.

Update the getAllHousingLocations function to make a call to the web server you configured.

```
// adev/src/content/tutorials/first-app/steps/14-http/src-final/app/housing.service.ts
import {Injectable} from '@angular/core';
import {HousingLocation} from './housinglocation';
@Injectable({
  providedIn: 'root',
})
export class HousingService {
  url = 'http://localhost:3000/locations';
  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }
  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? {};
  }
  submitApplication(firstName: string, lastName: string, email: string) {
    // tslint:disable-next-line
    console.log(firstName, lastName, email);
  }
}

```

The code now uses asynchronous code to make a GET request over HTTP.

HELPFUL: For this example, the code uses fetch. For more advanced use cases consider using HttpClient provided by Angular.

Update the getHousingLocationsById function to make a call to the web server you configured.

```
// adev/src/content/tutorials/first-app/steps/14-http/src-final/app/housing.service.ts
import {Injectable} from '@angular/core';
import {HousingLocation} from './housinglocation';
@Injectable({
  providedIn: 'root',
})
export class HousingService {
  url = 'http://localhost:3000/locations';
  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }
  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? {};
  }
  submitApplication(firstName: string, lastName: string, email: string) {
    // tslint:disable-next-line
    console.log(firstName, lastName, email);
  }
}
```

Once all the updates are complete, your updated service should match the following code.

```
// Final version of housing.service.ts
import {Injectable} from '@angular/core';
import {HousingLocation} from './housinglocation';
@Injectable({
  providedIn: 'root',
})
export class HousingService {
  url = 'http://localhost:3000/locations';
  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }
  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? {};
  }
  submitApplication(firstName: string, lastName: string, email: string) {
    // tslint:disable-next-line
    console.log(firstName, lastName, email);
  }
}
```

## Update the components to use asynchronous calls to the housing service

The server is now reading data from the HTTP request but the components that rely on the service now have errors because they were programmed to use the synchronous version of the service.

In src/app/home/home.component.ts, update the constructor to use the new asynchronous version of the getAllHousingLocations method.

```
// adev/src/content/tutorials/first-app/steps/14-http/src-final/app/home/home.component.ts

import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HousingLocationComponent} from '../housing-location/housing-location.component';
import {HousingLocation} from '../housinglocation';
import {HousingService} from '../housing.service';
@Component({
  selector: 'app-home',
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter />
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location
        *ngFor="let housingLocation of filteredLocationList"
        [housingLocation]="housingLocation"
      ></app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocation[] = [];
  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }
  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter((housingLocation) =>
      housingLocation?.city.toLowerCase().includes(text.toLowerCase()),
    );
  }
}
```

In src/app/details/details.component.ts, update the constructor to use the new asynchronous version of the getHousingLocationById method.

```
// adev/src/content/tutorials/first-app/steps/14-http/src-final/app/details/details.component.ts

import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {HousingService} from '../housing.service';
import {HousingLocation} from '../housinglocation';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
@Component({
  selector: 'app-details',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <img
        class="listing-photo"
        [src]="housingLocation?.photo"
        alt="Exterior photo of {{ housingLocation?.name }}"
        crossorigin
      />
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
        <p class="listing-location">{{ housingLocation?.city }}, {{ housingLocation?.state }}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{ housingLocation?.availableUnits }}</li>
          <li>Does this location have wifi: {{ housingLocation?.wifi }}</li>
          <li>Does this location have laundry: {{ housingLocation?.laundry }}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName" />
          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName" />
          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email" />
          <button type="submit" class="primary">Apply now</button>
        </form>
      </section>
    </article>
  `,
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });
  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService.getHousingLocationById(housingLocationId).then((housingLocation) => {
      this.housingLocation = housingLocation;
    });
  }
  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    );
  }
}
```

Save your code.

Open the application in the browser and confirm that it runs without any errors.
