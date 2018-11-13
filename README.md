This is a work in Progress Code Challenge

At this Point in time there are some challenges outstanding which are listed below.


## What works right now 

The App loads data from the TMDB Current Movie and Genre APIs.

The Movies are displayed with the rating, title and movie poster.

The Movies are sorted by rating after loading

The Movies can be filtered using a slider component from the Material UI lab. 



## Next Steps

- Get distinct movie ids from the movie genre array so genre checkboxes only of the results set are shown
- Map through the genre array and genre ids and send the genre names to the Movie Component 
- Display the genres as chips in the Movie Card 
- Add selected checkboxes to a genrefilter array 
- Combine the genrefilter array with rating filter 
- Set up tests in Jest 
- Refactor code so that state is used less




## Quick Install from GitHub

```sh
git clone https://github.com/xoryco/moviechallenge.git
cd moviechallenge
npm install
npm start
```



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## To Run this Project on your own machine

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

Currently no JEST/Enzyme tests have been set up but this is to do.

### `npm run build`

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
