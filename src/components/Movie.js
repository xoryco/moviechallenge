import React, { Component } from "react";
import { POSTER_SIZE } from "../config";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

//declare function component with props of title poster path and vote average
// NEED TO ADD GENRES
class Movie extends Component {
  

  
  render() {
    //Destructure required data from props
    //const { title, poster_path, vote_average, genre_ids } = this.props.movie;
    //this.state.genreNames.map((name, i) => {
      //let { genreNames } =  this.state;
    
      //console.log(this.state.genreNames);
    /*const testi = this.state.genreNames;

     testi.map((name, i) => {
      console.log(name + i);
     });
      */

      //console.log(this.props.genrelist); 
    const genreList = this.props.genrelist;
    const movieIds = this.props.genre_ids;
    let movieGenreNames = [];
    //Loop Array of Ids of the current movie
    for (let movId of movieIds){
      //Loop Array of Ids of all the genres
      for (let genre of genreList) {
        //if id matches the movie id add the genre name to the array
        if ((genre.id / movId)===1) {
          movieGenreNames.push(genre.name)
        }
      }
      
    }
    console.log("movieGenreNames");
    console.log(movieGenreNames);
    //this.setState({genreNames: movieGenreNames});
    this.genreNames = movieGenreNames;
    
    return(
      <div>
        <div>
          {this.props.title ? (
            <Card style={{ margin: "20px", maxWidth: "290px", maxHeight: "500px" }}>
              {/* Movie Poster */}
              <CardMedia
                style={{ height: "300px", width: "290px" }}
                image={
                  this.props.poster_path
                    ? `${this.props.baseUrl}${POSTER_SIZE}${this.props.poster_path}`
                    : "./images/placeholder.jpg"
                }
                title={this.props.title}
              />
              {/* Title of the Movie */}
              <CardContent>         
                <Typography gutterBottom variant="headline" component="h3">
                  {this.props.title}
                </Typography>
                {/* Circular Avatar for Rating */}
              <Avatar style={{margin: '5',color: '#fff', backgroundColor: 'black', fontWeight: 'bolder', fontVariant: 'italic'}}>{this.props.vote_average}</Avatar>
              
                {/* This will be an array of chips for the genres */}
                {this.genreNames.length > 0 ? this.genreNames.map((name, i) =>
                  <Chip label={name} key={i}/>
                ) : <div>No Genres</div>}
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    );
                
  }
}
/*const Movie = ({ title, poster_path, vote_average, genre_ids }, genrelist) => (
  
);*/

export default Movie;
