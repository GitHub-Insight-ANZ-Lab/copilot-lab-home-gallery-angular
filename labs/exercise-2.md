
# Exercise 2: Add routes to the application

The exercise consist of building Angular components for various functionality.

Enabled routing in your app as well as defined new routes. Now your app can support navigation between views.

## Create a default details component 

Create a details component `DetailsComponent`. This component will represent the details page that provides more information on a given housing location.

```
ng generate component details
```

## Add routing to the application

- In the src/app directory, create a file called routes.ts. This file is where we will define the routes in the application.

- In main.ts, make the following updates to enable routing in the application:

Import the routes file and the provideRouter function:

```
// Import routing details in src/main.ts
import {bootstrapApplication, provideProtractorTestingSupport} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {provideRouter} from '@angular/router';
import routeConfig from './app/routes';

bootstrapApplication(AppComponent, {
  providers: [provideProtractorTestingSupport(), provideRouter(routeConfig)],
}).catch((err) => console.error(err));
```

Update the call to bootstrapApplication to include the routing configuration:

```
// Add router configuration in src/main.ts
import {bootstrapApplication, provideProtractorTestingSupport} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {provideRouter} from '@angular/router';
import routeConfig from './app/routes';

bootstrapApplication(AppComponent, {
  providers: [provideProtractorTestingSupport(), provideRouter(routeConfig)],
}).catch((err) => console.error(err));
```

- In src/app/app.component.ts, update the component to use routing:

Add a file level import for RoutingModule:

```
// Import RouterModule in src/app/app.component.ts
import {RouterModule} from '@angular/router';
```

Add RouterModule to the @Component metadata imports

```
// Import RouterModule in src/app/app.component.ts
  template: `
    <main>
      <a [routerLink]="['/']">
        <header class="brand-name">
          <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true" />
        </header>
      </a>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
```

In the template property, replace the <app-home></app-home> tag with the <router-outlet> directive and add a link back to the home page. Your code should match this code:

```
// Add router-outlet in src/app/app.component.ts
<main>
      <a [routerLink]="['/']">
        <header class="brand-name">
          <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true" />
        </header>
      </a>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
```

## Add route to new component

In the previous step you removed the reference to the <app-home> component in the template. In this step, you will add a new route to that component.

- In routes.ts, perform the following updates to create a route.

Add a file level imports for the HomeComponent, DetailsComponent and the Routes type that you'll use in the route definitions.

```
// Import components and Routes
import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DetailsComponent} from './details/details.component';
```

Define a variable called routeConfig of type Routes and define two routes for the app:

```
// Add routes to the app
const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page',
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Home details',
  },
];
export default routeConfig;
```

- Save all changes and confirm that the application works in the browser. The application should still display the list of housing locations.

