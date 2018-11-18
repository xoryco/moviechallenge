import React, { Component } from "react";
import { API_URL, API_KEY } from "./config";
import Movie from "./components/Movie";
import Slider from "@material-ui/lab/Slider";
import "./App.css";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import logo from "./hotflix.svg";

class App extends Component {
  state = {
    allMovies: [], //All the movies loaded from TMDB
    movies: [], //Filtered Movie Result Set
    loading: false, //Flag while loading data
    rating: 3, //Selected Rating with default of 3
    genreId: [], //Selected Genres Filter Ids
    genreList: [], //Genres from TMDB
    imageUrl: "//image.tmdb.org/t/p/"
  };

  /* componentDidMount LIFECYCLE METHOD */

  componentDidMount() {
    //Generate URL string literal from API details in config using an ES6 template literal
    const imageSettingsUrl = `${API_URL}configuration?api_key=${API_KEY}`;
    const genresUrl = `${API_URL}genre/movie/list?api_key=${API_KEY}`;
    const movieUrl = `${API_URL}movie/popular?api_key=${API_KEY}`;
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
    //SET THE CURRENTLY SELECTED MOVIE FOR INITIAL STATE PROB DELETE THIS
    this.setState({ movies: mylist });
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

    console.log("UNIQUE GENRES" + uniqueIds);
    console.log(uniqueIds);
    //Copy the Loaded Genres
    let unfilteredGenres = this.state.genreList;
    console.log(this.state.genreList);

    let filteredGenres = unfilteredGenres.filter(genre => {
      for (let unique of uniqueIds) {
        if (genre.id === unique) return genre.id;
      }
    });
    this.setState({ genreList: filteredGenres });

    //let name = this.lookupGenreNames([18, 35]);
    //console.log("new array lets see what comes back");
    //console.log(name);
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

    this.setState({
      genreId: selectedIds
    });
    console.log(this.state.genreId);
    this.filterResults(this.state.rating, this.state.genreId);
  };

  filterResults = (rating = 3, ids = []) => {
    console.log("The Selected Rating For the search is " + rating);
    console.log("The Selected ID" + ids);
    console.log(ids);

    const allMovies = this.state.allMovies;

    //let movieresults = new Array;
    let movieresults = [];
    //let genreFilter = [18, 10402];
    let genreFilter = ids;
    console.log("genreFilter");
    console.log(genreFilter);
    //Get Length of the GenreFilter
    const filterCount = genreFilter.length;
    //For each movie in all of the movies
    for (let movie of allMovies) {
      //check if the movie rating is greater or equal to the inputted rating
      if (movie.vote_average >= rating) {
        //if no genres are selected add the results to our array
        if (filterCount === 0) {
          movieresults.push(movie);
        } else {
          let matchedGenres = 0;
          for (let genre of genreFilter) {
            console.log(genre);
            if (movie.genre_ids.includes(genre)) {
              matchedGenres++;
            } /*
            else{
              movieresults.push(movie);
            }*/
          }
          if (matchedGenres === filterCount) {
            movieresults.push(movie);
          }
        }
      }
    }
    console.log(movieresults);
    this.setState({
      movies: movieresults
    });
  };

  /* Look up Genre Names by Table */
  /* Maybe add new property to the AllMovies property */
  /*lookupGenreNames = (ids = []) => {
    console.log(ids);
    let GenreNames = [];
    let GenreTable = this.state.genreList;
    for (let num of ids) {
      if (parseInt(num) === GenreTable.id) {
        GenreNames.push(GenreTable.name);
      }
    }
    console.log(GenreNames);
    return GenreNames;
  };*/

  /* RENDER LIFE CYCLEMETHOD */
  render() {
    const { movies, genreList } = this.state;
    return (
      <div className="App">
        <AppBar position="fixed" style={{ background: "#000000" }}>
          <Toolbar>
            <img
              src={logo}
              style={{ width: "15%", padding: "1%" }}
              alt="Hotflix Logo"
            />
            <Typography variant="title" color="inherit">
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
              <h2>
                Movie Rating better than <br /> (<em>{this.state.rating}</em>{" "}
                out of 10)
              </h2>

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
                  onChange={this.handleOnChange.bind(this)}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={8}>
              <h2>Select Only Films of a Certain Genre(s)</h2>
              <form>
                {/* Checkboxes for genres */}
                {genreList.map((genre, i) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={this.handleCheckBox}
                        value={genre.id}
                        key={genre.id}
                        style={{ color: "white" }}
                      />
                    }
                    style={{ color: "white" }}
                    className={"white"}
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
              movies.map((movie, i)=> (
                <Movie {...movie} genrelist={this.state.genreList} baseUrl={this.state.imageUrl} key={i}/>
              ))
            ) : (
              <div>
                <Typography variant="h2" color="inherit">
                  No currently showing movies match your criteria
                </Typography>
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;