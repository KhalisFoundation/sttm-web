describe('Home page Search tests', () => {
  describe('First Letter Search from Start(G)', () => {
    it('should return search results for "bhb" in drop-down', () => {
      cy.visit('/');

      cy.get('#search')
        .type('bhb');

      cy.get('.search-result span')
        .should('contain', 'bwqn')
        .should('contain', 'bMdau')
        .should('contain', 'bMdk')
        .should('contain', 'bwqn');

    });

    it('should hightlight only first words in sentence', () => {
      cy.get('.search-highlight-word')
        .eq(0)
        .should('contain', 'bwqn');

      cy.get('.search-highlight-word')
        .eq(1)
        .should('contain', 'hI');

      cy.get('.search-highlight-word')
        .eq(2)
        .should('contain', 'bYkuMT');
    });

    it('should open all search results page on clicking the "Show All Results" button', () => {

      cy.get('.search-result a')
        .last()
        .should('have.text', 'Show full results')
        .click({ force: true });

      cy.url().should('include', '/search?q=bhb&type=0&source=all');
    });

    it('should open all search results page on typing "bhb" in search field and pressing enter', () => {
      cy.visit('/');

      cy.get('.toast-notification-close-button')
        .click();

      cy.get('#search')
        .type('bhb');

      cy.get('.search-form').submit();

      cy.url().should('include', '/search?q=bhb&type=0&source=all');
    });

    it('should open Shabad page on typing "bhb" in search field,highlight search result and pressing enter', () => {
      cy.visit('/');

      cy.get('#search')
        .type('bhb');

      cy.get('.search-result a');

      cy.get('#search')
        .focus()
        .type('{downarrow}')
        .type('{enter}');

      cy.url().should('include', '&q=bhb&type=0&source=all&highlight=');
    });

    it('should open Shabad page on typing "bhb" in search field and clicking a search result', () => {
      cy.visit('/');

      cy.get('.toast-notification-close-button')
        .click();

      cy.get('#search')
        .type('bhb');

      cy.get('.search-result a')
        .first()
        .click();

      cy.url().should('include', "&q=bhb&type=0&source=all&highlight=");
    });
  });
});
