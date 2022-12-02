import React, { Component } from 'react';
import {movieData, oneMovie} from '../../movieData.js';
import MoviesCardsContainer from '../MoviesCardsContainer/MoviesCardsContainer';
import Details from '../Details/Details.js'
import './App.css';

console.log(oneMovie)

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
    fetch('https://rancid-tomatillos.herokuapp.com/api/v2/moviesz')
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error
        }})
      .then(data => {
        this.setState({movies: data.movies})
      })
      .catch(error => {
        console.log(error)
        this.setState({error: 'Something went wrong, please try again later.'})
      })

  }

  displayDetails = (id) => {
    this.setState({movies: [], movieDetails: oneMovie, showDetails: true, showAllMovies: false})
    console.log("display the details")
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
        {this.state.showDetails && <Details details={this.state.movieDetails.movie}/>}
        {this.state.movies && <MoviesCardsContainer displayDetails={this.displayDetails}allMovieData={allMovieData}/>}
      </main>
    </>
  )}
}

export default App;
