const sttmBlue = 'rgb(1, 102, 155)';

Cypress.Commands.add('checkSgCard', function checkGranthIndices({ childNo, english, gurmukhi }) {
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


Cypress.Commands.add('loadAmritKeertanFirstChapter', () => {
  // Amrit Keertan
  cy.get('.granthIndex')
    .eq(2)
    .find('tbody tr')
    .as('amritKeertanRows')

  // Clicking on first row will load the shabads for that chapter
  cy.get('@amritKeertanRows')
    .first()
    .click({ force: true })
    .get('.amritKeertanIndexRowShabad')
    .as('firstChapterShabads')
    .should('have.length.gt', 0)
})

describe('Navigation', () => {
  const sundarGutkaBaanis = 104;

  context('Sundar-Gutka page', () => {
    beforeEach(() => {
      cy.visit('/');

      cy.get('.toast-notification-close-button')
        .click();

      cy.get('li[data-cy=sundar-gutka-page] a')
        .click();
    })

    it('should display grid of all baanis correctly', () => {

      // sundar gutka card
      cy.get('.sgCard')
        .should('have.length', sundarGutkaBaanis)

      cy.checkSgCard({ childNo: 0, english: 'gur mantr', gurmukhi: 'ਗੁਰ ਮੰਤ੍ਰ' })

      cy.checkSgCard({ childNo: sundarGutkaBaanis - 1, english: 'kaanaRe kee vaar mahalaa chauthhaa', gurmukhi: 'ਕਾਨੜੇ ਕੀ ਵਾਰ ਮਹਲਾ ੪' })
    })

  })