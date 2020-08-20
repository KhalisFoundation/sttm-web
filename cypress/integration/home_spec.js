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
      cy.get('.search-result')
        .last()
        .scrollTo('bottom');

      cy.get('.toast-notification-close-button')
        .click();

      cy.get('.search-result a')
        .last()
        .should('have.text', 'Show full results')
        .click();

      cy.url().should('include', '/search?q=bhb&type=0&source=all');
    });

    it('should open all search results page on typing "bhb" in search field and pressing enter', () => {
      cy.visit('/');

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

      cy.get('#search')
        .type('bhb');

      cy.get('.search-result a')
        .first()
        .click();

      cy.url().should('include', "&q=bhb&type=0&source=all&highlight=");
    });
  });

  describe('First Letter Search from anywhere(G)', () => {
    it('should return search results for "ApAb" in drop-down', () => {
      cy.visit('/');

      cy.get('#search-type')
        .select('1');

      cy.get('#search')
        .type('ApAb');

      cy.get('.search-result span')
        .should('contain', 'Akwl')
        .should('contain', 'purK')
        .should('contain', 'AgwiD')
        .should('contain', 'boD');

    });

    it('should hightlight words anywhere in sentence', () => {
      cy.get('.search-highlight-word')
        .eq(0)
        .should('contain', 'Akwl');

      cy.get('.search-highlight-word')
        .eq(1)
        .should('contain', 'purK');

      cy.get('.search-highlight-word')
        .eq(2)
        .should('contain', 'AgwiD');

      cy.get('.search-highlight-word')
        .eq(3)
        .should('contain', 'boD');
    });

    it('should open all search results page on clicking the "Show All Results" button', () => {
      cy.get('.toast-notification-close-button')
        .click();

      cy.get('.search-result a')
        .last()
        .should('have.text', 'Show full results')
        .click();

      cy.url().should('include', '/search?q=ApAb&type=1&source=G');
    });

    it('should open all search results page on typing "ApAb" in search field and pressing enter', () => {
      cy.visit('/');

      cy.get('#search-type')
        .select('1');

      cy.get('#search')
        .type('ApAb');

      cy.get('.search-form').submit();

      cy.url().should('include', '/search?q=ApAb&type=1&source=G');
    });

    it('should open Shabad page on typing "ApAb" in search field, highlight search result and pressing enter', () => {
      cy.visit('/');

      cy.get('#search-type')
        .select('1');

      cy.get('#search')
        .type('ApAb');

      cy.get('.search-result a');

      cy.get('#search')
        .focus()
        .type('{downarrow}')
        .type('{enter}');

      cy.url().should('include', '&q=ApAb&type=1&source=G&highlight=');
    });

    it('should open Shabad page on typing "ApAb" in search field and clicking a search result', () => {
      cy.visit('/');

      cy.get('#search-type')
        .select('1');

      cy.get('#search')
        .type('ApAb');

      cy.get('.search-result a')
        .first()
        .click();

      cy.url().should('include', "&q=ApAb&type=1&source=G&highlight=");
    });

  });
});
