import React, { Component } from 'react';
import {movieData, oneMovie} from '../../movieData.js';
import MoviesCardsContainer from '../MoviesCardsContainer/MoviesCardsContainer';
import Details from '../Details/Details.js'
import './App.css';
import fetchData from '../../apiCalls.js'
import Error from '../Error/Error.js'
import { Route, BrowserRouter, Link } from 'react-router-dom'


class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      showDetails: false,
      showError: false,
      sortByTitlePressed: true,
      sortByRatingPressed: false,
    }
  }

  componentDidMount() {
    this.displayAllMovies()
  }

  displayAllMovies = () => {
    Promise.resolve(fetchData('movies'))
        .then(data => {
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
    this.setState({movies: data, movieDetails: {}, showDetails: false, sortByTitlePressed: false,
      sortByRatingPressed: true})
  }

  sortByTitle = (data) => {
    data.sort((a, b) => {
      if (a.title > b.title) {
        return 1 
      } else {
        return -1
      }
    })
    this.setState({movies: data, movieDetails: {}, showDetails: false, sortByTitlePressed: true,
      sortByRatingPressed: false})
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
          <Link style={{color:'inherit', textDecoration: 'inherit'}} to='/'><h1>Rancid Tomatillos</h1></Link>
          {this.state.error && <h4>{this.state.error}</h4>}
        </header>
        <main className="App">
          <Route path="/:movie" render={({ match }) => {
            const id = parseInt(match.params.movie)
            console.log(id)
          return <Details id={id} closeError={this.closeError}/>
        }
        }/>
          <Route exact path='/' render={ () => 
          <MoviesCardsContainer allMovieData={allMovieData} sortByTitle={this.sortByTitle} sortByTitlePressed={this.state.sortByTitlePressed} sortByRating={this.sortByRating} sortByRatingPressed={this.state.sortByRatingPressed}/>
        } 
          />
        </main>
      </>
    </BrowserRouter>
    )
  }
}


export default App;
