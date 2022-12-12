describe("All movies page testing", () => {
  beforeEach(() => {
    cy.intercept('https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
      method: "GET",
      fixture: "../fixtures/movies.json"
    })
    cy.visit('localhost:3000')
  })

  it('should display the title of the application', () => {
    cy.contains("Rancid Tomatillos")
  })

  it('should display a collection of movies', () => {
    cy.get('.MoviesCardsContainer').should('exist')
    cy.get('.card').should('have.length', 3)
      .should('be.visible')
    cy.get('.card').eq(0).should('contain', "Money Plane")
      .and('contain', 5)
    cy.get('.poster').eq(0).should('have.attr', 'src', "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg")
    cy.get('.card').eq(1).should('contain', "Mulan")
      .and('contain', 8)
    cy.get('.poster').eq(1).should('have.attr', 'src', "https://image.tmdb.org/t/p/original//aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg")
    cy.get('.card').eq(2).should('contain', "Rogue")
      .and('contain', 7.33)
    cy.get('.poster').eq(2).should('have.attr', 'src', "https://image.tmdb.org/t/p/original//uOw5JD8IlD546feZ6oxbIjvN66P.jpg")
  })

  it('should display movie details when the movie card is clicked', () => {
    cy.get('.poster').eq(0).click()
    cy.get('.MoviesCardsContainer').should('not.exist')
  })

  it('should sort the movies by rating when the sort by rating button is clicked', () => {
    cy.get('.sort-button-rating').click()
    cy.get('.card').eq(0).should('contain', "Mulan")
    .and('contain', 8)
    cy.get('.poster').eq(0).should('have.attr', 'src', "https://image.tmdb.org/t/p/original//aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg")
    cy.get('.card').eq(1).should('contain', "Rogue")
      .and('contain', 7.33)
    cy.get('.poster').eq(1).should('have.attr', 'src', "https://image.tmdb.org/t/p/original//uOw5JD8IlD546feZ6oxbIjvN66P.jpg")
    cy.get('.card').eq(2).should('contain', "Money Plane")
      .and('contain', 5)
    cy.get('.poster').eq(2).should('have.attr', 'src', "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg")
  })

  it('should sort the movies by alphabetical order when the sort button is clicked', () => {
    cy.get('.card').eq(0).should('contain', "Money Plane")
      .and('contain', 5)
    cy.get('.poster').eq(0).should('have.attr', 'src', "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg")
    cy.get('.card').eq(1).should('contain', "Mulan")
      .and('contain', 8)
    cy.get('.poster').eq(1).should('have.attr', 'src', "https://image.tmdb.org/t/p/original//aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg")
    cy.get('.card').eq(2).should('contain', "Rogue")
      .and('contain', 7.33)
    cy.get('.poster').eq(2).should('have.attr', 'src', "https://image.tmdb.org/t/p/original//uOw5JD8IlD546feZ6oxbIjvN66P.jpg")
  })

  it('should find movies based on search bar and by the pressed sort button', () => {
    cy.get('input').type('M')
    cy.get('.card').eq(0).should('contain', "Money Plane")
    cy.get('.card').eq(1).should('contain', "Mulan")
    cy.get('.card').eq(2).should('not.exist')
    cy.get('#sort-rating-button').click()
    cy.get('.card').eq(0).should('contain', "Mulan")
    cy.get('.card').eq(1).should('contain', "Money Plane")
    cy.get('.card').eq(2).should('not.exist')
  })

  it('should still sort by button pressed when search input is cleared', () => {
    cy.get('input').type('M')
    cy.get('input').clear()
    cy.get('.card').eq(0).should('contain', "Money Plane")
    cy.get('.card').eq(1).should('contain', "Mulan")
    cy.get('.card').eq(2).should('contain', "Rogue")
    cy.get('#sort-rating-button').click()
    cy.get('input').type('M')
    cy.get('input').clear()
    cy.get('.card').eq(0).should('contain', "Mulan")
    cy.get('.card').eq(1).should('contain', "Rogue")
    cy.get('.card').eq(2).should('contain', "Money Plane")
  })

  it('should not show any movies and display a message if input doesn\'t match any movies', () => {
    cy.get('input').type('F')
    cy.get('.card').should('not.exist')
    cy.contains("No movies found!")
  })

})


describe("All movies error display", () => {
  beforeEach(() => {
    cy.intercept('https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
      method: "GET",
    },
      {
        statusCode: 500,
      })
    cy.visit('localhost:3000')
  })

  it('Should display the error', () => {
    cy.get('.error').should('exist')
    cy.get('.error-content').should('contain', 'Oops! Looks like there as a problem.')
  })

  it('Should go away after Dismiss button is clicked', () => {
    cy.get('.dismissButton').click().should('not.exist')
  })


}) 