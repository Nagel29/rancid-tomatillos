import React from 'react';
import rotten from '../../images/spoiled-tomatillo.png'
import good from '../../images/ripe-tomatillo.png'
import './Card.css';
import { Link } from 'react-router-dom'

const Card = ({ id, poster_path, title, rating, displayDetails }) => {

    let ratingImage = rating < 6 ? rotten : good;
    
    return (
        <div className='card'>
            <h4>{title}</h4>
            <Link to={`/${id}`}><img src={poster_path} className="poster"></img></Link>
            <section className="section-rating">
                <img src={ratingImage} className="image-rating"></img>
                {rating.toFixed(2)}
            </section>
        </div>
    )
}

export default Card
