import React from 'react';
import rotten from '../../spoiled-tomatillo.png'
import good from '../../ripe-tomatillo.png'
import './Card.css';

const Card = ({ id, posterPath, title, rating, displayDetails }) => {

    let ratingImage = rating < 6 ? rotten : good
    return (
        <div>
            <h4>{title}</h4>
            <img  onClick={() => displayDetails(id)} src={posterPath} className="poster"></img>
            <section className="section-rating">
                <img src={ratingImage} className="image-rating"></img>
                {rating.toFixed(2)}
            </section>
        </div>
    )
}

export default Card
