describe("Movie details page", () => {
  beforeEach(() => {
    //we won't need this much of a set up with router, we will just need the updated URL
    cy.intercept('https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
      method: "GET",
      fixture: "../fixtures/movies.json"
    })
    cy.visit('localhost:3000')
    cy.get('.poster').eq(0).click()
    cy.intercept('https://rancid-tomatillos.herokuapp.com/api/v2/movies/694919', {
      method: "GET",
      fixture: "../fixtures/money_plane.json"
    })
    
  })
  it('should display the title of the application', () => {
    cy.contains("Rancid Tomatillos")
  })

  it('should contain all of the movie\'s details', () => {
    cy.get('.details-container').should('contain', "Money Plane")
      .and('contain', 'Summary: A professional thief with $40 million in debt and his family\'s life on the line must commit one final heist - rob a futuristic airborne casino filled with the world\'s most dangerous criminals.')
      .and('contain', 'Release date: 2020-09-29')
      .and('contain', 'Rating: 6.875')
      .and('contain', 'Movie Budget: $0')
      .and('contain', 'Box Office Revenue: $0')
      .and('contain', 'Run time: 82 mins')
    cy.get('.poster-img').should('have.attr', 'src', "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg")
    cy.get('.main-details')
      .should('have.css', 'background-image')
      .and('include', 'https://image.tmdb.org/t/p/original//pq0JSpwyT2URytdFG0euztQPAyR.jpg')
    cy.get('.genre').should('contain', 'Action')
  })

  it('should display the home button and bring the user back to the all movie display', () => {
    cy.get('.home-button').should('exist').click()
    cy.get('.main-details').should('not.exist')
    cy.get('.home-button').should('not.exist')
    cy.get('.MoviesCardsContainer').should('exist')
  })
})
