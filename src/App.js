import React, { Component } from "react";
import { API_URL, API_KEY } from "./config";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "./theme";
import Slider from "@material-ui/lab/Slider";
import "./App.css";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Movie from "./components/Movie";
import logo from "./hotflix.svg";

class App extends Component {
  state = {
    allMovies: [], //All the movies loaded from TMDB
    movies: [], //Filtered Movie Result Set
    loading: false, //Flag while loading data
    rating: 3, //Selected Rating with default of 3
    genreId: [], //Selected Genres Filter Ids
    genreList: [], //Genres from TMDB
    imageUrl: "//image.tmdb.org/t/p/" //Set baseline imageUrl as current working base
  };

  /* componentDidMount LIFECYCLE METHOD */
  componentDidMount() {
    //Generate URL string literal from API details in config using an ES6 template literal
    const imageSettingsUrl = `${API_URL}configuration?api_key=${API_KEY}`;
    const genresUrl = `${API_URL}genre/movie/list?api_key=${API_KEY}`;
    const movieUrl = `${API_URL}movie/popular?api_key=${API_KEY}`;
    this.setState({ loading: true });
    this.getImageSettings(imageSettingsUrl);
    this.getGenres(genresUrl);
    this.getMovies(movieUrl);
  }

  //Retrieve Genres from the Genre API of TMDB
  getImageSettings = imageSettingsUrl => {
    fetch(imageSettingsUrl)
      .then(result => result.json())
      .then(result => {
        this.setState({ imageUrl: result.images.secure_base_url });
      })
      .catch(error => console.error("Image API Error:", error));
  };

  //Retrieve Genres from the Genre API of TMDB
  getGenres = genresUrl => {
    fetch(genresUrl)
      .then(result => result.json())
      .then(result => {
        this.setState({ genreList: [...result.genres] });
      })
      .catch(error => console.error("Genre API Error:", error));
  };

  //Retrieve Current Movies from the Movie API of TMDB
  getMovies = movieUrl => {
    fetch(movieUrl)
      .then(result => result.json())
      .then(result => {
        this.setState(
          {
            allMovies: [...result.results],
            loading: false
          },
          () => {
            this.sortResults();
          }
        );
      })
      .catch(error => console.error("Movie API Error:", error));
  };

  /* Sort Order of Movie Results by the popularity property of the movie */
  sortResults = () => {
    let mylist = this.state.allMovies;
    mylist.sort((a, b) => {
      return b.popularity - a.popularity;
    });
    this.setState({ allMovies: mylist });
    // Call the filter Method to only show active genres
    this.filterGenres();
  };

  //Get Distinct genre values from all retrieved Movies
  filterGenres = () => {
    const totalMovies = this.state.allMovies;
    //get all genre ids from the results set
    const allGenreIds = totalMovies.map(movie => movie.genre_ids);
    // flatten the array of genre ids and merge together
    const allIds = [].concat(...allGenreIds);
    //array of unique ids by using Set and converting it to an array
    const uniqueIds = [...new Set(allIds)];
    //Copy the Loaded Genres
    let unfilteredGenres = this.state.genreList;

    let filteredGenres = unfilteredGenres.filter(genre => {
      for (let unique of uniqueIds) {
        if (genre.id === unique) {
        return genre.id;
        }
      }
    });
    this.setState({ genreList: filteredGenres });
    this.filterResults(this.state.rating, this.state.genreId);
  };

  /* Handle Slider Changes */
  handleOnChange = (event, value) => {
    const newValue = parseFloat(value);
    this.setState({
      rating: newValue
    });
    this.filterResults(newValue, this.state.genreId);
  };

  /* Handle Checkbox Changes */
  handleCheckBox = event => {
    let checkboxId = parseInt(event.target.value);
    let selectedIds = this.state.genreId;

    if (selectedIds.includes(checkboxId)) {
      const existingIndex = selectedIds.findIndex(ids => ids === checkboxId);
      selectedIds.splice(existingIndex, 1);
    } else {
      selectedIds.push(checkboxId);
    }
    //Set the state of the selected genre ids
    this.setState({
      genreId: selectedIds
    });
    //Call our results method with current values of rating and selected genres
    this.filterResults(this.state.rating, this.state.genreId);
  };

  filterResults = (rating = 3, ids = []) => {
    const allMovies = this.state.allMovies;

    let movieresults = [];

    let genreFilter = ids;
    //Get Length of the GenreFilter
    const filterCount = genreFilter.length;
    //For each movie in all of the movies
    for (let movie of allMovies) {
      //check if the movie rating is greater or equal to the inputted rating
      if (movie.vote_average >= rating) {
        //if no genres are selected add the results to our array
        if (filterCount === 0) {
          movieresults.push(movie);
        } //otherwise match all selected genres to those in the movie, checking for length to ensure all match
        else {
          let matchedGenres = 0;
          for (let genre of genreFilter) {
            if (movie.genre_ids.includes(genre)) {
              matchedGenres++;
            }
          }
          if (matchedGenres === filterCount) {
            movieresults.push(movie);
          }
        }
      }
    }
    //Set the state of the Moviesresults of our filtered set of movies
    //This will be displayed by the movie component
    this.setState({
      movies: movieresults
    });
  };

  /* RENDER LIFE CYCLEMETHOD */
  render() {
    const { movies, genreList } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <AppBar position="fixed" style={{ background: "#000000" }}>
            <Toolbar>
              <img
                src={logo}
                style={{ width: "15%", padding: "1%" }}
                alt="Hotflix Logo"
              />
              <Typography variant="h4" color="inherit">
                What's showing Now!
              </Typography>
            </Toolbar>
          </AppBar>

          <Grid container spacing={24} style={{ padding: 24 }}>
            <Grid
              container
              spacing={24}
              style={{ background: "rgba(255,255,255,0.1)", marginTop: "6%" }}
            >
              <Grid item xs={12} sm={4}>
                <Typography variant="h4" gutterBottom={true}>
                  Movie Rating better than <br /> (<em>{this.state.rating}</em>{" "}
                  out of 10)
                </Typography>

                <div>
                  {/* Input slider for ratings */}
                  <Slider
                    style={{
                      width: "50%",
                      margin: "auto"
                    }}
                    value={this.state.rating}
                    min={0}
                    max={10}
                    step={0.5}
                    color="secondary"
                    onChange={this.handleOnChange.bind(this)}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="h4" gutterBottom={true}>
                  Select Only Films of a Certain Genre(s)
                </Typography>
                <form>
                  {/* Checkboxes for genres */}
                  {genreList.map((genre, i) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={this.handleCheckBox}
                          value={`${genre.id}`}
                          key={genre.id}
                          style={{ color: "white" }}
                        />
                      }
                      style={{ color: "white" }}
                      color={"secondary"}
                      key={genre.id}
                      label={genre.name}
                    />
                  ))}
                </form>
              </Grid>
            </Grid>
            <Grid container spacing={24}>
              <div>
                <hr />
              </div>
              {/* if there are movies that meet the search criteria display each using the movie component */}
              {this.state.movies.length > 0 ? (
                movies.map((movie, i) => (
                  <Movie
                    {...movie}
                    genrelist={this.state.genreList}
                    baseUrl={this.state.imageUrl}
                    key={i}
                  />
                ))
              ) : (
                <div>
                  <Typography
                    variant="h2"
                    color="secondary"
                    style={{
                      color: "#FFFFFF",
                      paddingTop: "2em",
                      textAlign: "center"
                    }}
                  >
                    No currently showing movies match your criteria
                  </Typography>
                </div>
              )}
            </Grid>
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
