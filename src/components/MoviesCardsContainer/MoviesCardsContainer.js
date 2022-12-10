import React from 'react';
import Card from '../Card/Card.js';
import './MoviesCardsContainer.css';

const MoviesCardsContainer = ({ allMovieData, displayDetails, sortByTitle, sortByTitlePressed, sortByRating, sortByRatingPressed }) => {
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
                    <button className={sortByTitlePressed && 'pressed'} onClick={() => sortByTitle(allMovieData)} aria-pressed={sortByTitlePressed}>Title (A-Z)</button>
                    <button className={sortByRatingPressed && 'pressed'} onClick={() => sortByRating(allMovieData)} aria-pressed={sortByRatingPressed}>Rating (Descending)</button>
                </div>
            </div>
            <div className="MoviesCardsContainer">
                {allCards}  
            </div>
        </div>
    )
}

export default MoviesCardsContainer
