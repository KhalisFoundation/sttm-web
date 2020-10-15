
describe('Settings', () => {
  before(() => {
    cy.visit('/');

    cy.get('.toast-notification-close-button')
      .click();

    cy.get('[data-cy=random-shabad] a')
      .click()
  })

  describe('Sources', () => {
    context('Transliterations', () => {
      const shabadClassNamePrefix = '.mixed-view-baani-transliteration';
      const controlPrefix = '#checkbox-Transliteration';

      beforeEach(() => {
        cy.get('[data-cy=Display]')
          .click()
          .find('ul')
          .first()
          .as('transliterations');
      })

      it('should show hindi transliterations, on selecting hindi transliterations option', () => {
        // hindi transliteration
        cy.get('@transliterations')
          .find(`${controlPrefix}-hindi`)
          .click({ force: true })

        cy.get(`${shabadClassNamePrefix}-hindi`).should('be.visible');

      })

      it('should show shahmukhi transliterations, on selecting spanish transliterations option', () => {
        // shahmukhi transliteration
        cy.get('@transliterations')
          .find(`${controlPrefix}-shahmukhi`)
          .click({ force: true })

        cy.get(`${shabadClassNamePrefix}-shahmukhi`).should('be.visible');
      })

      it('should display english transliterations, on selecting english transliteration option', () => {
        // Close english transliterations
        cy.get('@transliterations')
          .find(`${controlPrefix}-english`)
          .click({ force: true });

        // Select english transliterations
        cy.get('@transliterations')
          .find(`${controlPrefix}-english`)
          .click({ force: true })

        cy.get(`${shabadClassNamePrefix}-english`).should('be.visible');
      })
    })

    context('Translations', () => {
      const shabadClassNamePrefix = '.mixed-view-baani-translation';
      const controlPrefix = '#checkbox-Translation';

      beforeEach(() => {
        cy.get('[data-cy=Display]')
          .click()
          .find('ul')
          .eq(1)
          .as('translations');
      })

      it('should display english translation, on selecting english translation option', () => {
        // Close english translations
        cy.get('@translations')
          .find(`${controlPrefix}-english`)
          .click({ force: true });

        // Select english translations
        cy.get('@translations')
          .find(`${controlPrefix}-english`)
          .click({ force: true })

        cy.get(`${shabadClassNamePrefix}-english`).should('be.visible');
      })

      it('should show punjabi translations, on selecting punjabi translation option', () => {
        // punjabi translation
        cy.get('@translations')
          .find(`${controlPrefix}-punjabi`)
          .click({ force: true })

        cy.get('.mixed-view-baani-steek-bani db').should('be.visible');
      })

      it('should show spanish translations, on selecting spanish translation option', () => {
        // spanish translation
        cy.get('@translations')
          .find(`${controlPrefix}-spanish`)
          .click({ force: true })

        cy.get(`${shabadClassNamePrefix}-spanish`).should('be.visible');
      })
    })
  })
})