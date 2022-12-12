const cleanData = (data) => {
    const cleanedData = data.movies.reduce((acc, movie) => {
        acc.movies.push({
            id: movie.id,
            key: movie.id,
            posterPath: movie['poster_path'],
            title: movie.title,
            rating: movie['average_rating'],
        })
        return acc;
    }, { movies: [] })

    return cleanedData;
}

export default cleanData;