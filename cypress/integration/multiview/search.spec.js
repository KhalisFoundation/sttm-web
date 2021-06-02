describe('Multi View', () => {
  describe('Search page', () => {
    const showFullResults = 'Show full results';
    const searchString = 'mlsp';

    beforeEach(() => {
      cy.visit('/');

      cy.get('.toast-notification-close-button')
        .click();
    });    

    it(`should add shabad from ${showFullResults} page`, () => {
      cy.get('#search-type')
        .select('1');

      cy.get('#search')
        .type(searchString); 

      cy.get('#suggestions')
        .scrollTo('bottom')
        .find('.show-all-results a')
        .should('exist')
        .scrollIntoView()
        .click({ force: true })

      cy.get('.search-results-display li:first-child button[data-cy=add-shabad]').as('result')    

      cy.get('@result').click().then(() => {
        cy.get('.multiple-shabads-display ul li').should('have.length', 1)  
      })
    })
  });
});