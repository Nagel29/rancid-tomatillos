import React from 'react';
import Card from '../Card/Card.js';
import PropTypes from 'prop-types'
import './MoviesCardsContainer.css';

const MoviesCardsContainer = ({ allMovieData, sortByTitle, sortByTitlePressed, sortByRating, sortByRatingPressed }) => {
    const allCards = allMovieData.map(movie => {
        return (
            <Card
                id={movie.key}
                key={movie.key}
                poster_path={movie.posterPath}
                title={movie.title}
                rating={movie.rating}
            />
        )
    })

    return (
        <div>
            <h2 className='directions'>Click a poster to view more details!</h2>
            <div className="sort">
                <p className="sort-by">Sort by:</p>
                <div className="sortButtons">
                    <button className={sortByTitlePressed ? 'pressed' : undefined} onClick={() => sortByTitle(allMovieData)} aria-pressed={sortByTitlePressed}>Title (A-Z)</button>
                    <button className={sortByRatingPressed ? 'pressed' : undefined} onClick={() => sortByRating(allMovieData)} aria-pressed={sortByRatingPressed}>Rating (Descending)</button>
                </div>
            </div>
            <div className="MoviesCardsContainer">
                {allCards}  
            </div>
        </div>
    )
}

export default MoviesCardsContainer

MoviesCardsContainer.propTypes = {
    allMovieData: PropTypes.array,
    sortByTitle: PropTypes.func,
    sortByRating: PropTypes.func,
    sortByTitlePressed: PropTypes.bool,
    sortByRatingPressed: PropTypes.bool 
}