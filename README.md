
# MAD307 - Assignment 8

## Project Overview

This project is an Angular football player roster application using TheSportsDB API.

Users can:
- View football players.
- View individual player details.
- Add new players.
- Edit existing players.
- Remove players.
- Navigate between pages using Angular routing.

Assignment 8 adds built-in pipes, custom pipes, lazy loading, lifecycle hooks, and automatic input focus.

## API

This project uses TheSportsDB API to retrieve football player information.

Documentation:
https://www.thesportsdb.com/api.php

Example request:
https://www.thesportsdb.com/api/v1/json/123/lookup_all_players.php?id=133604

The API returns JSON containing a player array with player names, positions, teams, and images.

## Part 1 - Built-in Pipes

Three Angular built-in pipes are used in the Player List component.

### UpperCasePipe

Displays player names in uppercase.

Example:

`player().strPlayer | uppercase`

### TitleCasePipe

Formats player positions in title case.

Example:

`player().strPosition | titlecase`

### DatePipe

Formats a date using the mediumDate parameter.

Example:

`today | date:'mediumDate'`

## Part 2 - Custom Pipes

Two custom pipes were generated using the Angular CLI.

### PlayerNamePipe

This pipe removes leading and trailing whitespace from player names.

If the input is null, undefined, or empty, it returns "Unknown Player".

### PlayerPositionPipe

This pipe formats player positions and accepts an optional boolean parameter.

The parameter determines whether the position is abbreviated.

Examples:

- Forward becomes FWD.
- Midfielder becomes MID.
- Defender becomes DEF.
- Goalkeeper becomes GK.

The parameter defaults to false.

Example usage:

`player().strPosition | playerPosition:true`

If the input is null, undefined, or empty, the pipe returns "Unknown Position".

### Pipe Chaining

The application chains custom pipes with built-in pipes.

Examples:

`player().strPlayer | playerName | uppercase`

`player().strPosition | playerPosition:true | titlecase`

Both custom pipes use the @Pipe decorator, implement PipeTransform, and retain the default pure behavior.

## Part 3 - Lazy Loading

The application uses loadComponent with dynamic import() for route components.

Lazy-loaded routes include:

- Player List
- Player Detail
- Add Player
- Edit Player

The edit route continues to use editGuard.

### Before Lazy Loading - Assignment 7

Initial bundle raw size: 310.59 kB

Estimated transfer size: 81.37 kB

### After Lazy Loading - Assignment 8

Initial bundle raw size: 284.64 kB

Estimated transfer size: 78.15 kB

### Lazy Chunk Files

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

Lazy loading reduces the initial bundle because Angular loads route components separately when they are needed.

### Network Tab Verification

Lazy loading was tested using Chrome Developer Tools.

The Network tab showed a dynamically requested JavaScript chunk when navigating to the Player Detail route.

The player-detail component also loaded successfully.

This confirmed that Angular was loading the route dynamically.

## Part 4 - Lifecycle Hooks

The Player Detail component implements OnInit and OnDestroy.

### ngOnInit

When a player detail page opens, ngOnInit reads the route ID, looks up the player, and records the opening time using Date.now().

Example:

`[lifecycle] opened: Albert Stuivenberg`

### ngOnDestroy

When the user leaves the detail page, ngOnDestroy calculates the time spent on the page.

The duration is rounded to whole seconds.

Actual console results:

`[lifecycle] opened: Albert Stuivenberg`

`[lifecycle] closed: Albert Stuivenberg after 52 seconds`

`[lifecycle] opened: Ben White`

`[lifecycle] closed: Ben White after 6 seconds`

### Constructor Experiment

The route ID was temporarily accessed using this.id() inside the constructor.

The value was undefined because Angular had not yet assigned the route input.

In ngOnInit, the route input was available because Angular had initialized the component inputs.

This demonstrates why route input values should be read after Angular initializes them.

The temporary constructor was removed after testing.

### Navigation and Destruction

Navigating away from the Player Detail route causes Angular to destroy the detail component.

This triggers ngOnDestroy and allows the application to log how long the user spent viewing the player.

## Going Further - afterNextRender and viewChild

The Player Form uses viewChild to reference the Player Name input.

The component registers afterNextRender in its constructor.

After Angular renders the form, the Player Name input automatically receives focus.

This belongs in afterNextRender instead of ngOnInit because focusing the input requires the DOM element to have been rendered.

The functionality works on both Add Player and Edit Player forms.

## Testing

The following features were implemented:

- Built-in pipes.
- Two custom pipes.
- Custom pipe parameter.
- Pipe chaining.
- Missing-value handling.
- Lazy-loaded routes.
- Route guards.
- Lifecycle hooks.
- Time tracking on player details.
- Automatic input focus.

The Angular production build completed successfully.

## Running the Application

Install dependencies:

`npm install`

Start the development server:

`ng serve`

Open:

http://localhost:4200

Build the application:

`ng build`

## Version

0.7.0
