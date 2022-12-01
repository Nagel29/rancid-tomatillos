import React, { Component } from 'react';
import movieData from '../../movieData.js';
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
    return (
    <h1>Rancid Tomatillos</h1>
    <MovieCardsContainer />
  )}
}

export default App;
