describe('Navigation', () => {
  context('Index', () => {
    const totalSggsRows = 62;
    const totalSdgsRows = 18;
    beforeEach(() => {
      cy.visit('/');

      cy.get('li[data-cy=index] a')
        .click();
    })


    it('should open with indexes of SGGS, SDGS, Amrit Keertan', () => {
      // SGGS Granth
      cy.get('.granthIndex')
        .eq(0)
        .find('tbody tr')
        .as('sggsRows')

      cy.get('@sggsRows').should('have.length', totalSggsRows)
      cy.get('@sggsRows').first().find('td').first().should('contain.text', 'Raag Sri');
      cy.get('@sggsRows').last().find('td').first().should('contain.text', 'Raag Maala');

      // SDGS Granth
      cy.get('.granthIndex')
        .eq(1)
        .find('tbody tr').as('sdgsRows')
      cy.get('@sdgsRows').should('have.length', totalSdgsRows)

    })
  })
})