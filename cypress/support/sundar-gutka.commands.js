Cypress.Commands.add('checkSgCard', ({ childNo, english, gurmukhi }) => {
  const sttmBlue = 'rgb(1, 102, 155)';
  const em = 18; //no of pixel

  // sundar gutka card
  cy.get('.sgCard')
    .eq(childNo)
    .as('sgCard');

  cy.get('@sgCard')
    .should('have.css', 'height', (8 * em) + 'px') //8em ==> 8 * 18px
    .should('have.css', 'background-color', sttmBlue);

  cy.get('@sgCard')
    .find('.sgCardGurmukhi')
    .should('include.text', gurmukhi)

  cy.get('@sgCard')
    .find('.sgCardEnglish')
    .should('have.text', english)
});
