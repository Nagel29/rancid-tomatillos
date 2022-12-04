import React from 'react';
import Card from '../Card/Card.js';
import './MoviesCardsContainer.css';

const MoviesCardsContainer = ({ allMovieData, displayDetails }) => {
    const allCards = allMovieData.map(movie => {
        return (
            <Card
                id={movie.key}
                key={movie.key}
                posterPath={movie.posterPath}
                title={movie.title}
                rating={movie.rating}
                displayDetails={displayDetails}
            />
        )
    })

    return (
        <div>
            <div className="MoviesCardsContainer">
                {allCards}  
            </div>
        </div>
    )
}

export default MoviesCardsContainer