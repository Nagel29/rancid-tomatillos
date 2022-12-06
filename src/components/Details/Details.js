import React from 'react'
import './Details.css'

const Details = ({ details }) => {
  const styles = {
    backgroundImage: `url(${details['backdrop_path']})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "750px",
  }
  // console.log(details.genres)
  const buttons = details.genres.map(genre => {
    return <button className='genre'>{genre}</button>
  })
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

export default Details