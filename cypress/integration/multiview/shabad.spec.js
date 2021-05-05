describe('Multi View', () => {
  describe('Index page', () => {

    beforeEach(() => {
      cy.visit('/');

      cy.get('.toast-notification-close-button')
        .click();
    });


    it('should add shabad from top share buttons location', () => {
      cy.get('#search-type')
        .select('7');

      cy.get('#search')
        .type('mlsp'); 

      cy.get('.search-result li:first-child a').as('result')  

      cy.get('@result').click().then(() => {
        cy.get('[data-cy=add-shabad]').click({force: true}).then(() => {
          cy.get('.multiple-shabads-display ul li').should('have.length', 1)
        })
      })

      
    })
  });
});