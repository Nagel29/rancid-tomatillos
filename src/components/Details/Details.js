import React, { Component } from 'react'
import fetchData from '../../apiCalls.js'
import './Details.css'
import Error from '../Error/Error.js';
import { Link } from 'react-router-dom';

class Details extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movieDetails: {},
      showError: false,
    }
  }

  componentDidMount () {
    fetchData(`movies/${this.props.id}`)
      .then(data => {
        return this.setState({movieDetails: data.movie})
      
      })
      .catch(error => {
        console.log(error)
        this.setState({showError: true})
        console.log(this.state)
      })
  }

  
  render () {
    const details = this.state.movieDetails
    const buttons = Object.keys(details).length && details.genres.map(genre => {
      return <button className='genre'>{genre}</button>
    })
    const styles = {
      backgroundImage: `url(${details['backdrop_path']})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      height: "750px",
    }
    return (
      <div className='main-details' style={styles}>
      {this.state.showError && <Error closeError={this.props.closeError}/>}
        <div className='overlay'></div>
        <div className='details-container'>
          <img className='poster-img' name='posterPath' src={details['poster_path']}></img>
          <div className='details-content'>
            <h3 className='title'>{details.title}</h3>
            <h4 className='tagline'>{details.tagline}</h4>
            <div className='genre-tags'>{buttons}</div>
            <p>Summary: {details.overview}</p>
            <p>Release date: {details['release_date']}</p>
            <p>Rating: {details['average_rating']}</p>
            <p>Movie Budget: ${details.budget}</p>
            <p>Box Office Revenue: ${details.revenue}</p>
            <p>Run time: {details.runtime} mins</p>
            <Link to='/'><button className="home-button">HOME</button></Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Details