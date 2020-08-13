describe('Home page Search tests', () => {
  it('should search shabad Jo Mange Thakur Apne Te with default settings', () => {
    cy.visit('/')

    cy.get('#search')
      .clear()
      .type('bhb')

    cy.get('.search-result')
      .should('contain', 'bwqn')
      .should('contain', 'bMdau')
      .should('contain', 'bMdk')
      .should('contain', 'bwqn')

    cy.get('.search-highlight-word')

  })
})
