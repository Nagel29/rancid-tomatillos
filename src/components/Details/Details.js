import React from 'react'

const Details = ({ details }) => {
  const styles = {
    backgroundImage: `url(${details['backdrop_path']})`,
    backgroundRepeat: "no-repeat"
  }
  return (
    <div style={styles}>
      <h3>{details.title}</h3>
      <img name='posterPath' src={details['poster_path']}></img>
      {/* <img name='backdropPath' src={details['backdrop_path']}></img> */}
      <p>{details['release_date']}</p>
      <p>{details.overview}</p>
      <p>{details['average_rating']}</p>
      <p>{details.genres}</p>
      <p>{details.budget}</p>
      <p>{details.revenue}</p>
      <p>{details.runtime}</p>
      <p>{details.tagline}</p>
    </div>
  )
}

export default Details