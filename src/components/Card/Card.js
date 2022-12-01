import React from 'react';
import './Card.css'

const Card = ({ key, posterPath, title, rating }) => {
    return (
        <div key={key}>
            <img src={posterPath} className="poster"></img>
            <p>{title}</p>
            <p>{rating}</p>
        </div>
    )
}

export default Card