return (
  </BrowserRouter>
    <header>
      <h1>Rancid Tomatillos</h1>
      {this.state.error && <h2>{this.state.error}</h2>}
      {this.state.showDetails && <button className="home-button" onClick={() => this.displayAllMovies()}>HOME</button>}
    </header>
    <Router className="App">
      <Route path="/:movieID" render={({ match }) => {
        console.log("MOVIE ID", match.params.movieID)
        const id = parseInt(match.params.movieID)
        const toDisplay = this.displayDetails(id)
        console.log(toDisplay)
        
      return <Details details={toDisplay}/>
    }}/>
      <Route exact path='/' render={ () => <MoviesCardsContainer displayDetails={this.displayDetails} allMovieData={allMovieData} sortByTitle={this.sortByTitle} sortByRating={this.sortByRating}/>} />
    </Router>
  <BrowserRouter/>
  )