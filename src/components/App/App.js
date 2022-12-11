import React, { Component } from 'react';
import { Route, BrowserRouter, Link } from 'react-router-dom';
import './App.css';
import MoviesCardsContainer from '../MoviesCardsContainer/MoviesCardsContainer';
import Details from '../Details/Details.js';
import fetchData from '../../apiCalls.js';
import Error from '../Error/Error.js';
import cleanData from '../../utilities.js';


class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      filteredMovies: [],
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
        const cleanedData = cleanData(data)
        this.sortByTitle(cleanedData.movies)
      })
      .catch(error => {
        console.log(error)
        this.setState({ showError: true })
      })
  }

  sortByRating = (data) => {
    data.sort((a, b) => {
      return b.rating - a.rating;
    })
    this.setState({
      movies: data, movieDetails: {}, sortByTitlePressed: false,
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
      movies: data, movieDetails: {}, sortByTitlePressed: true,
      sortByRatingPressed: false
    })
  }

  filterByTitle = (searchInput) => {
    const filteredMovies = this.state.movies.filter(movie => movie.title.includes(searchInput))
    this.setState({ filteredMovies: filteredMovies })
    console.log(this.state.filteredMovies)
  }

  closeError = () => {
    this.setState({ showError: false })
  }

  render() {
    let allMovieData;
    if (this.state.filteredMovies.length > 0) {
      allMovieData = this.state.filteredMovies.map(movie => {
        return { id: movie.id, posterPath: movie.posterPath, title: movie.title, rating: movie.rating }
      })
    } else {
      allMovieData = this.state.movies.map(movie => {
        return { id: movie.id, posterPath: movie.posterPath, title: movie.title, rating: movie.rating }
      })
    }

    return (
      <BrowserRouter>
        <>
          {this.state.showError && <Error closeError={this.closeError} />}
          <header>
            <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to='/'><h1>Rancid Tomatillos</h1></Link>
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
