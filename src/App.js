import React, { Component } from "react";
import { API_URL, API_KEY } from "./config";
import Movie from "./components/Movie";
import Slider from "@material-ui/lab/Slider";
import "./App.css";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import logo from "./hotflix.svg";

class App extends Component {
  state = {
    allMovies: [],
    movies: [],
    loading: false,
    rating: 3,
    genreId: [],
    genreList: [{}]
  };

  componentDidMount() {
    //Generate URL string literal from API details in config using an ES6 template literal
    const movieUrl = `${API_URL}movie/popular?api_key=${API_KEY}`;
    const genresUrl = `${API_URL}genre/movie/list?api_key=${API_KEY}`;
    this.getMovies(movieUrl);
    this.getGenres(genresUrl);
  }

  //Retrieve Current Movies from the Genre API of TMDB
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
      .catch(error => console.error("Error:", error));
  };

  //Retrieve Genres from the Genre API of TMDB
  getGenres = genresUrl => {
    fetch(genresUrl)
      .then(result => result.json())
      .then(result => {
        this.setState({ genreList: [...result.genres] });
      })
      .catch(error => console.error("Error:", error));
  };

  /* Handle Checkbox Changes */
  handleOnChange = (event, value) => {
    const newValue = parseFloat(value);
    this.setState({
      rating: newValue
    });
    this.filterResults(newValue, [13, 22, 19, 24]);
  };

  /* Handle Checkbox Changes */
  handleCheckBox = event => {
    console.log(event.target.value);
    this.filterResults(this.state.rating, event.target.value);
  };

  /* Sort Order of Movie Results */
  sortResults = () => {
    let mylist = this.state.allMovies;
    mylist.sort((a, b) => {
      return b.vote_average - a.vote_average;
    });
    this.setState({ allMovies: mylist });

    //SET THE CURRENTLY SELECTED MOVIE FOR INITIAL STATE PROB DELETE THIS 
    this.setState({ movies: mylist });

    //GET DISTINCT values of the genres
    let dismovies = this.state.allMovies;

    let arr2 = [...new Array(dismovies.map(movies => movies.genre_ids))];
    console.log("UNIQUE GENRES BEFORE SET" + arr2);
    let uniqueItems = [...new Set(arr2)];
    console.log("UNIQUE GENRES" + uniqueItems);
  };

  filterResults = (rating = 3, ids) => {
    console.log("The Selected Rating For the search is " + rating);
    console.log("The Selected ID" + ids);

    const allMovies = this.state.allMovies;

    //let movieresults = new Array;
    let movieresults = [];

    for (let movie of allMovies) {
      if (movie.vote_average > rating) {
        //console.log(movie.title)
        movieresults.push(movie);
      }
    }
    console.log(movieresults);
    this.setState({
      movies: movieresults
    });
  };

  render() {
    const { movies, genreList } = this.state;
    return (
      <div className="App">
        <AppBar
          position="fixed"
          style={{ background: "#000000" }}
        >
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
          <Grid container spacing={24} style={{background:"rgba(255,255,255,0.1)", marginTop: "6%" }}>
            <Grid item xs>
              <h2>
                Movie Rating better than (<em>{this.state.rating}</em> out of
                10)
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
            <Grid item xs>
              <h2>All Genres [not working yet]</h2>
              <form>
                {/* Checkboxes for genres */}
                {genreList.map((genre, i) => (
                  <label>
                    <input
                      type="Checkbox"
                      value={genre.id}
                      onChange={this.handleCheckBox}
                      key={genre.id}
                    />
                    {genre.name}
                  </label>
                ))}
              </form>
            </Grid>
          </Grid>
          <Grid container spacing={24}>
            <div>
              <hr />
            </div>
            {/* if there are movies that meet the search criteria display each using the movie functional component */}
            {this.state.movies
              ? movies.map(movie => <Movie {...movie} />)
              : "No Movies found that match your criteria"}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
