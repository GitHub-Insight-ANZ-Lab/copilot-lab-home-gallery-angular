
# Exercise 6: Add HTTP communication to your app

This lab will integrate HTTP and an API into the app.

Up until this point the app has read data from a static array in an Angular service. The next step is to use a JSON server that your app will communicate with over HTTP. The HTTP request will simulate the experience of working with data from a server.

## Configure the JSON server

JSON Server is an open source tool used to create mock REST APIs. You'll use it to serve the housing location data that is currently stored in the housing service.

Ask copilot how to `Install json-server from npm`. You can use the `terminal` shortcut icon to run output script directly in VS code terminal

<details>
  <summary>Hint - Possible Solution</summary>

```
npm install -g json-server
```

</details>

In the root directory of your project, find `db.json` file. This is where you will store the data for the json-server. Open `db.json` and ask copilot to generate 10 more records based on the existing record. Copilot should generate more elements in the same structure.


<details>
  <summary>Hint - Possible Solution</summary>

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
        }
    ]
}

```

</details>

Save this file. Time to test your configuration. From the command line, at the root of your project run the following commands. In your web browser, navigate to the `http://localhost:3000/locations` and confirm that the response includes the data stored in `db.json`.


<details>
  <summary>Hint - Possible Solution</summary>

```
json-server --watch db.json
```

</details>

## Update service to use web server instead of local array

The data source has been configured, the next step is to update your web app to connect to it use the data.

Go to `src/app/housing.service.ts`, update the code to remove housingLocationList property and the array containing the data. Add a string property called url and set its value to `http://localhost:3000/locations`. This code will result in errors in the rest of the file because it depends on the housingLocationList property. We're going to update the service methods next.

```
url = 'http://localhost:3000/locations';
```

Update the `getAllHousingLocations` function to make a call to the web server you configured. The code should use asynchronous code to make a GET request over HTTP.

Ask copilot to implement the same logic using `fetch`. Then see if it can use HttpClient provided by Angular as an alternative.

<details>
  <summary>Hint - Possible Solution</summary>

```
// app/housing.service.ts
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

</details>

Update the `getHousingLocationsById` function to make a call to the web server you configured in the same way with filter.

<details>
  <summary>Hint - Possible Solution</summary>

```
// app/housing.service.ts
async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
  const data = await fetch(`${this.url}/${id}`);
  return (await data.json()) ?? {};
}
```

</details>

Once all the updates are complete, your updated service could look similar to below (but dont have to).

<details>
  <summary>Hint - Possible Solution</summary>

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

</details>

## Update the components to use asynchronous calls to the housing service

The server is now reading data from the HTTP request but the components that rely on the service now have errors because they were programmed to use the synchronous version of the service.

In `src/app/home/home.component.ts`, update the constructor to use the new asynchronous version of the `getAllHousingLocations` method.

In `src/app/details/details.component.ts`, update the constructor to use the new asynchronous version of the `getHousingLocationById` method.

<details>
  <summary>Hint - Possible Solution</summary>

```
// app/details/details.component.ts

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

</details>

Save your code. Open the application in the browser and confirm that it runs without any errors.


---------------
[Previous](./exercise-5.md) | [Next](./exercise-7.md)