import React from 'react';
import Card from '../Card/Card.js';

const MoviesCardsContainer = ({ allMovieData }) => {
    const allCards = allMovieData.map(movie => {
        return (
            <Card
                key={movie.key}
                posterPath={movie.posterPath}
                title={movie.title}
                rating={movie.rating}
            />
        )
    })

    return (
        <div>
            {allCards}
        </div>
    )
}

export default MoviesCardsContainer