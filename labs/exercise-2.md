# Exercise 2: Add routes to the application

The next a few lab exercises consist of building Angular features and components for various functionality.

For this lab, let's enabled routing in the app as well as define new routes so that `Home Gallary` app can support navigation between views.

## Create a default info component

We need to create a info component called `InfoComponent`. This component will represent the info page that provides more information on a given housing location.

Ask `Copilot chat` how to create a new Angular component. If you are happy with the suggestion, follow them to create `InfoComponent`.

<details>
  <summary>Hint - Possible Solution</summary>

```
ng generate component info
```

</details>

## Add route to new component

<!-- In the previous step you removed the reference to the <app-home> component in the template. In this step, you will add a new route to that component. -->

In the `src/app` directory, open `routes.ts`. This file is where we will define the routes in the application. 

Open `routes.ts`, we need to make the a few updates to create a route. Ask copilot to add a file level imports for the `HomeComponent`, `DetailsComponent` and the Angular `Routes` type that you'll use in the route definitions.

<details>
  <summary>Hint - Possible Solution</summary>

```
// Import components and Routes
import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DetailsComponent} from './details/details.component';
```

</details>

Ask copilot to complete the variable called `routeConfig` of type `Routes` by defining two routes for the app. Ask a follow up question to make sure `details` route uses `/:id`. Double check if the export of the `routes.ts` too.

<details>
  <summary>Hint - Possible Solution</summary>

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

</details>


## Add routing to the application

In `src/main.ts`, we need to make the updates to enable routing in the application.

Ask copilot how to import the routes file and the provideRouter function. Keep the empty `routes.ts` file open in te tabs that will provide context to copilot. If the response does not look right (e.g. for different Angular version), you can add more information to the prompt and try again.

<details>
  <summary>Hint - Possible Solution</summary>

```
// Import routing details in src/main.ts
import {provideRouter} from '@angular/router';
import routeConfig from './app/routes';
```

</details>

Then, ask copilot how to update the call to bootstrapApplication to include the routing configuration. If `provideRouter` reference is missing, select the whole `main.ts` and right click to use `Copilot -> Fix` action.

<details>
  <summary>Hint - Possible Solution</summary>

```
// Add router configuration in src/main.ts
bootstrapApplication(AppComponent, {
  providers: [provideProtractorTestingSupport(), provideRouter(routeConfig)],
}).catch((err) => console.error(err));
```

</details>

Next, open `src/app/app.component.ts` file, we need to update the component to use routing.

Rather than using `Copilot Chat`, try to use `inline chat` this time. Ask in the popup chatbox, `Add a file level import for RouterModule from Angular`. Go to line 2, and right click to open `Copilot -> Inline Chat` or use shortcut.

<details>
  <summary>Hint - Possible Solution</summary>

```
// Import RouterModule in src/app/app.component.ts
import {RouterModule} from '@angular/router';
```

</details>

See if copilot can also figure out how to `Add RouterModule to the @Component metadata imports` using `inline chat`. Go to `imports` line in the file, use `Inline Chat` again.

<details>
  <summary>Hint - Possible Solution</summary>

```
// Import RouterModule in src/app/app.component.ts
  imports: [HomeComponent, RouterModule],
```

</details>

Let's do the same to replace the <app-home></app-home> tag with the <router-outlet> directive, and add a <a> link back to the home page around <header> in the template property.

<details>
  <summary>Hint - Possible Solution</summary>

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

```

</details>

Save all changes and confirm that the application works in the browser. The application should still display the list of housing locations.

If there is any reference errors, try to copy the error into copilot chat, and see if it is able to resolve the errors for you. If any explanation is required, select the code and use `#selection` and `/explain` in the chat windows.

---

[Previous](./exercise-1.md) | [Next](./exercise-3.md)
