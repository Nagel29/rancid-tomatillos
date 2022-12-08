import React, { Component } from 'react'
import fetchData from '../../apiCalls.js'
import './Details.css'

class Details extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movieDetails: {}
    }
  }

  componentDidMount () {
    fetchData(`movies/${this.props.id}`)
      .then(data => {
        console.log(data.movie)
        return this.setState({movieDetails: data.movie})
        // console.log(this.state.movieDetails)
        // console.log(data.movie)
        // return data.movie
      })
      .catch(error => {
        console.log(error)
        // this.setState({showError: true, showDetails: false})
        // console.log(this.state)
      })
  }
  
  

  // displayDetails = (id) => {
    
  // }

  
  render () {
    console.log(this.state.movieDetails)
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
          </div>
        </div>
      </div>
    )
  }
}

export default Details