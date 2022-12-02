import React, { Component } from 'react';
import {movieData, oneMovie} from '../../movieData.js';
import MoviesCardsContainer from '../MoviesCardsContainer/MoviesCardsContainer';
import Details from '../Details/Details.js'
import './App.css';
import fetchData from '../../apiCalls.js'

class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      movieDetails: {},
      showDetails: false,
      showAllMovies: true,
      error: '',
    }
  }

  componentDidMount() {
    Promise.resolve(fetchData('movies'))
        .then(data => {
          this.setState({movies: data.movies})
        })
        .catch(error => {
          console.log(error)
          this.setState({error: 'Something went wrong, please try again later.'})
        })
  }

  displayDetails = (id) => {
    Promise.resolve(fetchData(`movies/${id}`))
      .then(data => this.setState({movies: [], movieDetails: data.movie, showDetails: true, showAllMovies: false}))
  }

  displayAllMovies = () => {
    this.setState({movies: movieData.movies, movieDetails: {}, showDetails: false, showAllMovies: true})
  }

  render() {
    const allMovieData = this.state.movies.map(movie => {
      return {key: movie.id, posterPath: movie['poster_path'], title: movie.title, rating: movie['average_rating']}
    })
    return (
    <>
      <header>
        <h1>Rancid Tomatillos</h1>
        {this.state.error && <h2>{this.state.error}</h2>}
        {this.state.showDetails && <button onClick={() => this.displayAllMovies()}>HOME</button>}
      </header>
      <main className="App">
        {this.state.showDetails && <Details details={this.state.movieDetails}/>}
        {this.state.movies && <MoviesCardsContainer displayDetails={this.displayDetails}allMovieData={allMovieData}/>}
      </main>
    </>
  )}
}

export default App;
