/* eslint-disable cypress/no-unnecessary-waiting */

describe('Navigation', () => {
  context('Random Shabad page', () => {

    beforeEach(() => {
      cy.visit('/');

      cy.get('.toast-notification-close-button')
        .click();

      cy.get('[data-cy=random-shabad]')
        .click();
    })

    it('should open a random shabad', () => {
      cy.url().should('include', '/shabad?id')

      cy.get('#shabad').should('be.visible');
    })

    it('should work properly on clicking scroll-to-top/fullscreen button', () => {

      cy.get('.fab.fullscreen').as('fullscreenIcon')
        .should('be.visible')
        .scrollIntoView()
        .then(() => {
          // TODO: using a better logic
          cy.wait(1000).then(() => {

            // Synchronous testing whether element is available or not
            if (Cypress.$('.fab.scroll-to-top').length > 0) {
              cy.get('.fab.scroll-to-top').as('scrollToTopIcon')
              // Action on clicking scroll-to-top
              cy.get('@scrollToTopIcon')
                .click()

              // Random wait for scrolling time
              cy.wait(1000).then(() => {
                cy.window().then($window => {
                  expect($window.scrollY).to.be.closeTo(0, 50);
                })
              });
            }

            // Action on clicking fullscreen icon
            cy
              .get('@fullscreenIcon')
              .click()

            cy.get('body').should('have.class', 'fullscreen-view')

            cy
              .get('@fullscreenIcon')
              .click()

            cy.get('body').should('not.have.class', 'fullscreen-view')
          })
        })
    })

    it('should render next/previous shabads on clicking next/previous buttons', () => {

      cy.url()
        .should('include', '/shabad?id')
        .then(url => {
          const shabadId = Number(url.split('id=')[1]);

          cy.get('.shabad-nav.left a')
            .first()
            .click();

          cy.url().should('include', `/shabad?id=${shabadId - 1}`);

          cy.get('#shabad').should('be.visible');

          cy.get('.shabad-nav.right a')
            .first()
            .click();

          cy.url().should('include', `/shabad?id=${shabadId}`);
        });
    })

    it('should display related shabads properly, if they exists', () => {
      cy.server();

      cy.route({ method: 'get', url: `http://stgapi.sikhitothemax.org/related/shabad/**` }).as('relatedShabads');

      cy.get('@relatedShabads')
        .then(relatedShabads => {
          if (relatedShabads) {
            cy.get('.relatedShabadWrapper').should('be.visible');
          } else {
            cy.get('.relatedShabadWrapper').should('not.be.visible');
          }
        })
    })
  })
})
