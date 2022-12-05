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
})
