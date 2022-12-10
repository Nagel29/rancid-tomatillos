import React from 'react';
import rotten from '../../images/spoiled-tomatillo.png'
import good from '../../images/ripe-tomatillo.png'
import './Card.css';
import { Link } from 'react-router-dom'

const Card = ({ id, poster_path, title, rating, displayDetails }) => {

    let ratingImage = rating < 6 ? rotten : good;
    let ratingAltText = rating < 6 ? 'rotten tomatillo' : 'fresh tomatillo'
    
    return (
        <div className='card'>
            <h3>{title}</h3>
            <Link to={`/${id}`}><img src={poster_path} alt={title} className="poster"></img></Link>
            <section className="section-rating">
                <img src={ratingImage} alt={ratingAltText} className="image-rating"></img>
                {rating.toFixed(2)}
            </section>
        </div>
    )
}

export default Card
