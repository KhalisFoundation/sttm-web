describe('Home page Search tests', () => {
  it('should search shabad Jo Mange Thakur Apne Te with default settings', () => {
    cy.visit('/')

    // search using first letters
    // cy.get('#search')
    //   .type('jmTAq')
    //   .should('have.value', 'jmTAq')

    // cy.get('.search-result')
    //   .should('contain', 'jo')
    //   .should('contain', 'mwgih')
    //   .should('contain', 'Twkur')
    //   .should('contain', 'Apuny')
    //   .should('contain', 'qy')

    cy.get('#search')
      .clear()
      .type('bhb')

    // get api response
    cy.wait(3000)

    cy.get('.search-result')
      .should('contain', 'bwqn')
      .should('contain', 'bMdau')
      .should('contain', 'bMdk')
      .should('contain', 'bwqn')

    cy.get('.search-highlight-word')

  })
})
