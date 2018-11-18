import React, { Component } from "react";
import { POSTER_SIZE } from "../config";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

//declare function component with props of title poster path and vote average

class Movie extends Component {
  render() {
    const genreList = this.props.genrelist;
    const movieIds = this.props.genre_ids;
    let movieGenreNames = [];
    //Loop Array of Ids of the current movie
    for (let movId of movieIds) {
      //Loop Array of Ids of all the genres
      for (let genre of genreList) {
        //if id matches the movie id add the genre name to the array
        if (genre.id / movId === 1) {
          movieGenreNames.push(genre.name);
        }
      }
    }

    this.genreNames = movieGenreNames;

    return (
      <div>
        <div>
          {this.props.title ? (
            <Card
              style={{ margin: "20px", maxWidth: "290px", maxHeight: "600px" }}
            >
              {/* Movie Poster */}
              <CardMedia
                style={{ height: "400px", width: "290px" }}
                image={
                  this.props.poster_path
                    ? `${this.props.baseUrl}${POSTER_SIZE}${
                        this.props.poster_path
                      }`
                    : "./images/placeholder.jpg"
                }
                title={this.props.title}
              />
              {/* Title of the Movie */}
            
                  <Avatar
                    style={{
                      margin: "5",
                      color: "#fff",
                      backgroundColor: "black",
                      fontWeight: "bolder",
                      fontVariant: "italic",
                      top: '-100px'
                    }}
                  >
                    {this.props.vote_average}
                  </Avatar>
                  <Typography variant="h5" gutterBottom={true} style={{color:'#333', fontWeight: '300'}}>
                  {this.props.title}
                </Typography>

              <CardContent>
                
                {/* Circular Avatar for Rating */}

                {/* This will be an array of chips for the genres */}
                {this.genreNames.length > 0 ? (
                  this.genreNames.map((name, i) => (
                    <Chip label={name} key={i} />
                  ))
                ) : (
                  <div>No Genres</div>
                )}
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Movie;
