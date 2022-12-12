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
      filteredMovies: [],
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
        this.setState({movies: cleanedData.movies}, this.filterByTitle)
      })
      .catch(response => {
          this.setState({errorStatus: response.status, errorText: response.statusText, showDetails: false})
      })
  }

  sortByRating = (data) => {
    data.sort((a, b) => {
      return b.rating - a.rating;
    })
    this.setState({
      filteredMovies: data, movieDetails: {}, sortByTitlePressed: false,
      sortByRatingPressed: true
    })
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
      filteredMovies: data, movieDetails: {}, sortByTitlePressed: true,
      sortByRatingPressed: false
    })
  }

  filterByTitle = (searchInput) => {
    if (!searchInput && this.state.sortByTitlePressed) {
      this.setState({ filteredMovies: this.state.movies }, () => this.sortByTitle(this.state.filteredMovies))
    } else if (!searchInput && this.state.sortByRatingPressed) {
      this.setState({ filteredMovies: this.state.movies }, () => this.sortByRating(this.state.filteredMovies))
    } else {
      const filteredMovies = this.state.movies.filter(movie => movie.title.toLowerCase().includes(searchInput.toLowerCase()))
      this.setState({ filteredMovies: filteredMovies })
    }
  }

  closeError = () => {
    this.setState({errorStatus: 200, errorText: ""})
  }

  render() {
     let allMovieData = this.state.filteredMovies.map(movie => {
        return { id: movie.id, posterPath: movie.posterPath, title: movie.title, rating: movie.rating }
      })

    return (
      <BrowserRouter>
        <>
        {this.state.errorStatus > 400 && <Error status={this.state.errorStatus} text={this.state.errorText} closeError={this.closeError}/>}
        <header>
          <Link style={{color:'inherit', textDecoration: 'inherit'}} to='/'><h1>Rancid Tomatillos</h1></Link>
          </header>
          <main className="App">
            <Route path="/:movie" render={({ match }) => {
              const id = parseInt(match.params.movie)
              return <Details id={id} closeError={this.closeError} />
            }
            } />
            <Route exact path='/' render={() =>
              <MoviesCardsContainer allMovieData={allMovieData} sortByTitle={this.sortByTitle} sortByTitlePressed={this.state.sortByTitlePressed} sortByRating={this.sortByRating} sortByRatingPressed={this.state.sortByRatingPressed} filterByTitle={this.filterByTitle} />
            } />
          </main>
        </>
      </BrowserRouter>
    )
  }
}


export default App;
