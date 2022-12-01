import React, { Component } from 'react';
import movieData from '../../movieData.js';
import MoviesCardsContainer from '../MoviesCardsContainer/MoviesCardsContainer';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      movieDetails: {}
    }
  }

  componentDidMount() {
    this.setState({movies: movieData.movies})
  }

  render() {
    const allMovieData = this.state.movies.map(movie => {
      return {key: movie.id, posterPath: movie['poster_path'], title: movie.title, rating: movie['average_rating']}
    })
    return (
    <main>
      <h1>Rancid Tomatillos</h1>
      <MoviesCardsContainer allMovieData={allMovieData}/>
    </main>
  )}
}

export default App;
