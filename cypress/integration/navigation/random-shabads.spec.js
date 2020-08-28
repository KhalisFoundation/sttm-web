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

    it('should render next/previous shabads on clicking next/previous buttons', () => {

      cy.url().then(url => {
        const shabadId = url.split('id=')[1];

        cy.get('shabad-nav.left')
          .click();

        cy.url().should('include', `/shabad?id=${shabadId - 1}`);

        cy.get('#shabad').should('be.visible');

        cy.get('shabad-nav.right')
          .click();

        cy.url().should('include', `/shabad?id=${shabadId}`);
      });

    })

    // it('should open bani-controller page on clicking bani-controller option', () => {

    //   cy.get('[data-cy=sync]')
    //     .find('.submenu-items')
    //     .invoke('show')
    //     .find('a')
    //     .last()
    //     .click()

    //   cy.url().should('include', '/control')

    //   cy.get('#code').should('be.visible');

    //   cy.get('#syncPassword').should('be.visible');

    //   cy.get('.sync-form--button')
    //     .should('be.visible');
    // })
  })
})