import React from "react";
import { MOVIE_POSTER_URL, POSTER_SIZE } from "../config";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

//declare function component with props of title poster path and vote average
// NEED TO ADD GENRES
const Movie = ({ title, poster_path, vote_average }) => (
  <div>
    {title ? (
      <Card style={{ margin: "20px", maxWidth: "250px", maxHeight: "500px" }}>
        {/* Movie Poster */}
        <CardMedia
          style={{ height: "300px", width: "250px" }}
          image={
            poster_path
              ? `${MOVIE_POSTER_URL}${POSTER_SIZE}${poster_path}`
              : "./images/placeholder.jpg"
          }
          title={title}
        />
        {/* Circular Avatar for Rating */}
        <Avatar style={{margin: '5',color: '#fff', backgroundColor: 'black', fontWeight: 'bolder', fontVariant: 'italic'}}>{vote_average}</Avatar>
        {/* Title of the Movie */}
        <CardContent>         
          <Typography gutterBottom variant="headline" component="h2">
            {title}
          </Typography>
          {/* This will be an array of chips for the genres */}
          <Chip label={title} />
        </CardContent>
      </Card>
    ) : null}
  </div>
);

export default Movie;
