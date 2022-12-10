import React from 'react';
import Card from '../Card/Card.js';
import './MoviesCardsContainer.css';

const MoviesCardsContainer = ({ allMovieData, displayDetails, sortByTitle, sortByRating }) => {
    const allCards = allMovieData.map(movie => {
        return (
            <Card
                id={movie.key}
                key={movie.key}
                poster_path={movie.posterPath}
                title={movie.title}
                rating={movie.rating}
                displayDetails={displayDetails}
            />
        )
    })

    return (
        <div>
            <h2 className='directions'>Click a poster to view more details!</h2>
            <div className="sort">
                <p className="sort-by">Sort by:</p>
                <div className="sortButtons">
                    <button className="sort-button-title" onClick={() => sortByTitle(allMovieData)}>Title (A-Z)</button>
                    <button className="sort-button-rating" onClick={() => sortByRating(allMovieData)}>Rating (Descending)</button>
                </div>
            </div>
            <div className="MoviesCardsContainer">
                {allCards}  
            </div>
        </div>
    )
}

export default MoviesCardsContainer