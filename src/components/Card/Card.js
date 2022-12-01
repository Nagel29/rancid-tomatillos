import React from 'react';
import './Card.css'

const Card = ({ id, posterPath, title, rating, displayDetails }) => {

    return (
        <div onClick={() => displayDetails(id)}>
            <img src={posterPath} className="poster"></img>
            <p>{title}</p>
            <p>{rating.toFixed(2)}</p>
        </div>
    )
}

export default Card