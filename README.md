
# MAD307 - Assignment 8

## Project Overview

This project is an Angular football player roster application.

Users can:
- View football players retrieved from an API.
- View individual player details.
- Add new players.
- Edit existing players.
- Remove players.
- Navigate between pages using Angular routing.

Assignment 8 introduces built-in pipes, custom pipes, lazy loading, lifecycle hooks, and automatic input focus.

## API

This project uses TheSportsDB API to retrieve football player information.

Documentation:
https://www.thesportsdb.com/api.php

Example request:
https://www.thesportsdb.com/api/v1/json/123/lookup_all_players.php?id=133604

The API returns JSON containing a player array with information such as player names, positions, teams, and images.

## Built-in Pipes

Three Angular built-in pipes are used:

1. UpperCasePipe - Displays player names in uppercase.
2. TitleCasePipe - Formats player positions in title case.
3. DatePipe - Formats a date using the mediumDate parameter.

## Custom Pipes

Two custom pipes were created using the Angular CLI.

### PlayerNamePipe

Removes leading and trailing whitespace and displays "Unknown Player" when the input is missing or empty.

### PlayerPositionPipe

Removes leading and trailing whitespace and displays "Unknown Position" when the input is missing or empty.

Both pipes handle null, undefined, and empty strings.

Both custom pipes use the @Pipe decorator and implement PipeTransform.

### Pipe Chaining

The custom pipes are chained with built-in pipes.

Examples:

`player().strPlayer | playerName | uppercase`

`player().strPosition | playerPosition | titlecase`

All pipes use the default pure behavior.

## Lazy Loading

The application uses loadComponent with dynamic import() for route components.

Lazy-loaded pages include:

- Player List
- Player Detail
- Add Player
- Edit Player

The editGuard remains active on the edit route.

Lazy loading reduces the amount of JavaScript initially downloaded because route components are loaded when needed.

## Build Chunk Comparison

The project was built using ng build before and after implementing lazy loading.

### Before Lazy Loading - Assignment 7

Initial bundle raw size: 310.59 kB

Estimated transfer size: 81.37 kB

The route components were included in the initial bundle.

### After Lazy Loading - Assignment 8

Initial bundle raw size: 284.64 kB

Estimated transfer size: 78.15 kB

Lazy chunks:

| Chunk | Raw Size |
|---|---|
| Player Form | 49.31 kB |
| Player List | 4.62 kB |
| Player Detail | 1.77 kB |
| Additional Chunk | 1.26 kB |

### Comparison

The initial bundle decreased from 310.59 kB to 284.64 kB.

Reduction: 25.95 kB

Percentage reduction: approximately 8.4%.

The estimated transfer size decreased from 81.37 kB to 78.15 kB.

The initial bundle is smaller because Angular can load route components separately instead of including them all in the initial bundle.

The application uses a redirect from the empty path to the player list.

## Lifecycle

### ngOnInit

The Player Detail component implements OnInit.

In ngOnInit, the component reads the route ID, looks up the player, and records the opening time using Date.now().

Example:

`[lifecycle] opened: Kylian Mbappé`

### ngOnDestroy

The Player Detail component implements OnDestroy.

In ngOnDestroy, the component calculates the time spent on the page and logs the player's name.

Example:

`[lifecycle] closed: Kylian Mbappé after 5 seconds`

The duration is rounded to whole seconds.

### Constructor Experiment

The route ID was temporarily accessed using this.id() inside the constructor.

The result was undefined because Angular had not yet assigned the route input when the constructor executed.

In ngOnInit, the input was available because Angular had initialized the component inputs.

This demonstrates why reading route input values in ngOnInit is more appropriate than reading them in the constructor.

The temporary constructor was removed after the experiment.

### Navigation and Destruction

Navigating away from the Player Detail route causes Angular to destroy the detail component.

This triggers ngOnDestroy and allows the application to log the time spent on that page.

## afterNextRender and viewChild

The Player Form uses viewChild to reference the Player Name input.

The component registers afterNextRender in its constructor.

After Angular renders the form, the input automatically receives focus.

This belongs in afterNextRender rather than ngOnInit because it interacts with a rendered DOM element.

The Add Player and Edit Player functionality remains available.

## Testing

The following features should be verified:

- Player list displays API data.
- Built-in pipes format player information.
- Custom pipes handle missing values.
- Player details display correctly.
- Add Player works.
- Edit Player works.
- Remove Player works.
- Edit guard remains functional.
- Lazy-loaded routes load correctly.
- Lifecycle messages appear in the browser console.
- Player Name input receives focus.
- Angular production build completes successfully.

## Running the Application

Install dependencies:

`npm install`

Start the application:

`ng serve`

Open:

http://localhost:4200

Build:

`ng build`

## Version

0.7.0
