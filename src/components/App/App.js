import React, { Component } from 'react';
import './App.css';
import MoviesCardsContainer from '../MoviesCardsContainer/MoviesCardsContainer';
import Details from '../Details/Details.js';
import fetchData from '../../apiCalls.js';
import Error from '../Error/Error.js';
import { Route, BrowserRouter, Link } from 'react-router-dom'

import cleanData from '../../utilities.js';


class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      showDetails: false,
      errorStatus: 0,
      errorText: "",
      sortByTitlePressed: true,
      sortByRatingPressed: false
    }
  }

  componentDidMount() {
    this.displayAllMovies()
  }

  displayAllMovies = () => {
    Promise.resolve(fetchData('movies'))
        .then(data => {
          const cleanedData = cleanData(data)
          this.sortByTitle(cleanedData.movies)})
        .catch(response => {
          this.setState({errorStatus: response.status, errorText: response.statusText, showDetails: false})
        })
  }

  sortByRating = (data) => {
    data.sort((a, b) => {
      return b.rating - a.rating;
    })
    this.setState({movies: data, movieDetails: {}, showDetails: false, sortByTitlePressed: false, sortByRatingPressed: true})
  }

  sortByTitle = (data) => {
    data.sort((a, b) => {
      if (a.title > b.title) {
        return 1
      } else {
        return -1
      }
    })
    this.setState({
      movies: data, movieDetails: {}, sortByTitlePressed: true,
      sortByRatingPressed: false
    })
  }

  closeError = () => {
    this.setState({errorStatus: 200, errorText: ""})
  }

  render() {
    const allMovieData = this.state.movies.map(movie => {
      return { id: movie.id, posterPath: movie.posterPath, title: movie.title, rating: movie.rating }
    })
    return (
    <BrowserRouter>
      <>
        {this.state.errorStatus > 400 && <Error status={this.state.errorStatus} text={this.state.errorText} closeError={this.closeError}/>}
        <header>
          <Link style={{color:'inherit', textDecoration: 'inherit'}} to='/'><h1>Rancid Tomatillos</h1></Link>
          {this.state.error && <h4>{this.state.error}</h4>}
        </header>
        <main className="App">
          <Route path="/:movie" render={({ match }) => {
            const id = parseInt(match.params.movie)
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
