describe('Navigation', () => {
  context('Sync', () => {
    beforeEach(() => {
      cy.visit('/');

      cy.get('.toast-notification-close-button')
        .click();
    })

    it('should open sync page on clicking sangat-sync option', () => {
      cy.get('[data-cy=sync]')
        .find('.submenu-items')
        .invoke('show')
        .find('a')
        .first()
        .click()

      cy.url().should('include', '/sync')

      cy.get('#code').should('be.visible');

      cy.get('.sync-form--button')
        .should('be.visible');
    })

    it('should open bani-controller page on clicking bani-controller option', () => {

      cy.get('[data-cy=sync]')
        .find('.submenu-items')
        .invoke('show')
        .find('a')
        .last()
        .click()

      cy.url().should('include', '/control')

      cy.get('#code').should('be.visible');

      cy.get('#syncPassword').should('be.visible');

      cy.get('.sync-form--button')
        .should('be.visible');
    })
  })
})