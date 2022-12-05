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
})
