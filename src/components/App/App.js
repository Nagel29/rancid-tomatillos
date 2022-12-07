import React, { Component } from 'react';
import {movieData, oneMovie} from '../../movieData.js';
import MoviesCardsContainer from '../MoviesCardsContainer/MoviesCardsContainer';
import Details from '../Details/Details.js'
import './App.css';
import fetchData from '../../apiCalls.js'
import Error from '../Error/Error.js'
import { Route, BrowserRouter } from 'react-router-dom'


class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      movieDetails: {},
      showDetails: false,
      showError: false,
    }
  }

  componentDidMount() {
    this.displayAllMovies()
  }

  displayDetails = (id) => {
    Promise.resolve(fetchData(`movies/${id}`))
      .then(data => {
        console.log(data.movie)
        this.setState({movieDetails: data.movie})
        console.log(this.state.movieDetails)
        // console.log(data.movie)
        // return data.movie
      })
      .catch(error => {
        console.log(error)
        this.setState({showError: true, showDetails: false})
        // console.log(this.state)
      })
  }

  displayAllMovies = () => {
    Promise.resolve(fetchData('movies'))
        .then(data => {
        // console.log(data)
        this.sortByTitle(data.movies)
        })
        .catch(error => {
          console.log(error)
          this.setState({showError: true, showDetails: false})
         
        })
      }

  sortByRating = (data) => {
    data.sort((a, b) => {
      return b.rating - a.rating;
    })
    this.setState({movies: data, movieDetails: {}, showDetails: false})
  }

  sortByTitle = (data) => {
    data.sort((a, b) => {
      if (a.title > b.title) {
        return 1 
      } else {
        return -1
      }
    })
    this.setState({movies: data, movieDetails: {}, showDetails: false})
  }

  closeError = () => {
    this.setState({showError: false})
  }

  render() {
    const allMovieData = this.state.movies.map(movie => {
      return {key: movie.id || movie.key, posterPath: movie['poster_path'] || movie.posterPath, title: movie.title, rating: movie['average_rating'] || movie.rating}
    })
    return (
    <BrowserRouter>
      <>
        {this.state.showError && <Error closeError={this.closeError}/>}
        <header>
          <h1>Rancid Tomatillos</h1>
          {this.state.error && <h2>{this.state.error}</h2>}
          {this.state.showDetails && <button className="home-button" onClick={() => this.displayAllMovies()}>HOME</button>}
        </header>
        <main className="App">
          <Route path="/:movie" render={({ match }) => {
            console.log("MOVIE ID", match.params.movie)
            const id = parseInt(match.params.movie)
            console.log(id)
            this.displayDetails(id)
            console.log(this.state.movieDetails)
            
          return <Details movie={this.state.movieDetails}/>
        }
        }/>
          <Route exact path='/' render={ () => 
          <MoviesCardsContainer displayDetails={this.displayDetails} allMovieData={allMovieData} sortByTitle={this.sortByTitle} sortByRating={this.sortByRating}/>
        } 
          />
        </main>
      </>
    </BrowserRouter>
    )
  }
}


export default App;
