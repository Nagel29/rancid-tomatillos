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
      error: '',

    }
  }

  componentDidMount() {
    this.displayAllMovies()
  }

  displayDetails = (id) => {
    Promise.resolve(fetchData(`movies/${id}`))
      .then(data => this.setState({movies: [], movieDetails: data.movie, showDetails: true}))
  }

  displayAllMovies = () => {
    Promise.resolve(fetchData('movie'))
        .then(data => {
          data.movies.sort((a, b) => {
            if (a.title > b.title) {
              return 1 
            } else {
              return -1
            }
          })
          this.setState({movies: data.movies, movieData: {}, showDetails: false})
        })
        .catch(error => {
          console.log(error)
          this.setState({movies: [], error: 'Something went wrong, please try again later.'})
        })
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
        {this.state.showDetails && <button className="home-button" onClick={() => this.displayAllMovies()}>HOME</button>}
      </header>
      <main className="App">
        {this.state.showDetails && <Details details={this.state.movieDetails}/>}
        {this.state.movies.length > 0 && <MoviesCardsContainer displayDetails={this.displayDetails} allMovieData={allMovieData}/>}
      </main>
    </>
  )}
}

export default App;
