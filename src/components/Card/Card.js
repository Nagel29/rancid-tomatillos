import React from 'react';
import './Card.css'

const Card = ({ id, posterPath, title, rating, displayDetails }) => {

    return (
        <div>
            <img  onClick={() => displayDetails(id)} src={posterPath} className="poster"></img>
            <p>{title}</p>
            <p>{rating.toFixed(2)}</p>
        </div>
    )
}

export default Card