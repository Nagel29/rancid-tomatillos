import React, { Component } from 'react'
import fetchData from '../../apiCalls.js'
import './Details.css'
import Error from '../Error/Error.js';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

class Details extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movieDetails: {},
      showError: false,
      detailsOpen: false,
    }
  }

  componentDidMount () {
    fetchData(`movies/${this.props.id}`)
      .then(data => {
        return this.setState({movieDetails: data.movie, detailsOpen: true})
      })
      .catch(error => {
        console.log(error)
        this.setState({showError: true})
        console.log(this.state)
      })
  }

  
  render () {
    const details = this.state.movieDetails
    const buttons = Object.keys(details).length && details.genres.map((genre, index) => {
      return <button key={index} className='genre'>{genre}</button>
    })
    const styles = {
      backgroundImage: `url(${details['backdrop_path']})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      height: "750px",
    }
    return (
      <div className='main-details' aria-expanded={this.state.detailsOpen} style={styles}>
      {this.state.showError && <Error closeError={this.props.closeError}/>}
        <div className='overlay'></div>
        <div className='details-container'>
          <img className='poster-img' name='posterPath' src={details['poster_path']} alt={`${details.title} poster image`}></img>
          <div className='details-content'>
            <h2 className='title'>{details.title}</h2>
            <h3 className='tagline'>{details.tagline}</h3>
            <div className='genre-tags'>{buttons}</div>
            <p>Summary: {details.overview}</p>
            <p>Release date: {details['release_date']}</p>
            <p>Rating: {details['average_rating']}</p>
            <p>Movie Budget: ${parseInt(details.budget, 10).toLocaleString("en-US")}</p>
            <p>Box Office Revenue: ${parseInt(details.revenue, 10).toLocaleString("en-US")}</p>
            <p>Run time: {details.runtime} mins</p>
            <Link to='/' className="home-link"><button className="home-button">HOME</button></Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Details

Details.propTypes = {
  id: PropTypes.number,
  closeError: PropTypes.func,
  key: PropTypes.number
}