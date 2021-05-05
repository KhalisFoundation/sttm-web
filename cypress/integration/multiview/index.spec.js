describe('Multi View', () => {
  describe('Index page', () => {
    const multiView = '.multiple-shabads-display'
    const multiViewButton = '[data-cy=multi-view-button]'
    const addShabadButton = '[data-cy=add-shabad]'
    const deleteShabadButton = '[data-cy=delete-shabad]'

    beforeEach(() => {
      cy.visit('/');

      cy.get('.toast-notification-close-button')
        .click();

      cy.get(multiViewButton)
        .click();
    });

    it('should open multi view sidebar', () => {
      cy.get(multiView).should('have.class', 'enable')
    })

    it('should add selected shabad from auto suggestions after typing keywords in search', () => {
      cy.get('#search-type')
        .select('1');

      cy.get('#search')
        .type('mlsp')
        .then(() => {
          cy.get(`.search-result li:first-child ${addShabadButton}`).as('result')  

          cy.get('@result').click().then(() => {
            cy.get(`${multiView} ul li`).should('have.length', 1)  
          })
        }) 

    })

    it('should delete selected shabad from multi view', () => {
      cy.get('#search-type')
        .select('1');

      cy.get('#search')
        .type('mlsp')
        .then(() => {
          cy.get(`.search-result li:first-child ${addShabadButton}`).click()
          cy.get(`.multiple-shabads-display ul li:first-child ${deleteShabadButton}`)
            .click()
            .then(() => {
              cy.get(`${multiView} ul li`).should('have.length', 0)  
            })
        })
    })
  });
});