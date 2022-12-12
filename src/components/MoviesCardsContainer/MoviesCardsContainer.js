import React from 'react';
import Card from '../Card/Card.js';
import PropTypes from 'prop-types';
import './MoviesCardsContainer.css';
import Form from '../Form/Form.js';

const MoviesCardsContainer = ({ allMovieData, sortByTitle, sortByTitlePressed, sortByRating, sortByRatingPressed, filterByTitle }) => {
    const allCards = allMovieData.map(movie => {
        return (
            <Card
                id={movie.id}
                key={movie.id}
                posterPath={movie.posterPath}
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
                    <button id='sort-title-button' className={sortByTitlePressed ? 'pressed' : 'sort-button-title'} onClick={() => sortByTitle(allMovieData)} aria-pressed={sortByTitlePressed}>Title (A-Z)</button>
                    <button id='sort-rating-button' className={sortByRatingPressed ? 'pressed' : 'sort-button-rating'} onClick={() => sortByRating(allMovieData)} aria-pressed={sortByRatingPressed}>Rating (Descending)</button>
                </div>
                <Form filterByTitle={filterByTitle}/>
            </div>
            {!allCards.length && <h4>No movies found!</h4>}
            <div className="MoviesCardsContainer">
                {allCards}
            </div>
        </div>
    )
}

export default MoviesCardsContainer

MoviesCardsContainer.propTypes = {
    allMovieData: PropTypes.array.isRequired,
    sortByTitle: PropTypes.func.isRequired,
    sortByRating: PropTypes.func.isRequired,
    sortByTitlePressed: PropTypes.bool,
    sortByRatingPressed: PropTypes.bool,
    filterByTitle: PropTypes.func.isRequired,
}