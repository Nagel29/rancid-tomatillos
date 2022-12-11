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
      .and('contain', 6.88)
    cy.get('.poster').eq(0).should('have.attr', 'src', "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg")
    cy.get('.card').eq(1).should('contain', "Mulan")
      .and('contain', 5.10)
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
    cy.get('.card').eq(0).should('contain', "Rogue")
      .and('contain', 7.33)
    cy.get('.poster').eq(0).should('have.attr', 'src', "https://image.tmdb.org/t/p/original//uOw5JD8IlD546feZ6oxbIjvN66P.jpg")
    cy.get('.card').eq(1).should('contain', "Money Plane")
      .and('contain', 6.88)
    cy.get('.poster').eq(1).should('have.attr', 'src', "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg")
    cy.get('.card').eq(2).should('contain', "Mulan")
      .and('contain', 5.10)
    cy.get('.poster').eq(2).should('have.attr', 'src', "https://image.tmdb.org/t/p/original//aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg")
  })

  it('should sort the movies by alphabetical order when the sort button is clicked', () => {
    cy.get('.card').eq(0).should('contain', "Money Plane")
      .and('contain', 6.88)
    cy.get('.poster').eq(0).should('have.attr', 'src', "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg")
    cy.get('.card').eq(1).should('contain', "Mulan")
      .and('contain', 5.10)
    cy.get('.poster').eq(1).should('have.attr', 'src', "https://image.tmdb.org/t/p/original//aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg")
    cy.get('.card').eq(2).should('contain', "Rogue")
      .and('contain', 7.33)
    cy.get('.poster').eq(2).should('have.attr', 'src', "https://image.tmdb.org/t/p/original//uOw5JD8IlD546feZ6oxbIjvN66P.jpg")
  })

})


describe("All movies server error display", () => {
  beforeEach(() => {
    cy.intercept('https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
      method: "GET",
    },
    {
      statusCode: 500,
    })
    cy.visit('localhost:3000')
  }) 

  it('Should display the server error', () => {
    cy.get('.error').should('exist')
    cy.get('.error-content').should('contain', 'Oops! Looks like there as a problem.')
  })

  it('Should go away after Dismiss button is clicked', () => {
    cy.get('.dismissButton').click().should('not.exist')
  })
}) 


  describe("All movies client side error", () => {
    beforeEach(() => {
      cy.intercept('https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
        method: "GET"
      },
      {
        statusCode: 404,
      })
      cy.visit('localhost:3000')
    })
  
    it('Should display the server error', () => {
      cy.get('.error').should('exist')
      cy.get('.error-content').should('contain', 'Uh oh.. This page doesn\'t exist. Please try again.')
        .and('contain', "404 Not Found")
    })
  
    it('Should go away after Dismiss button is clicked', () => {
      cy.get('.dismissButton').click().should('not.exist')
    })
  })

