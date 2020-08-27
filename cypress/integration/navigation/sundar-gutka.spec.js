import { getRandomNumber } from '../../utils';
import { sanitizeBaani } from '../../../src/js/pages/SundarGutka/utils';
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

describe('Navigation', () => {
  const sundarGutkaBaanis = 104;
  const searchString = 'jaa';

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

    it('should open correct bani on clicking sundar gutka card', () => {

      cy.get('.sgCard')
        .first()
        .click()

      cy.url().should('contain', '/sundar-gutka/gur-mantr');
    })

    it.only(`should display appriopriate number of cards on searching with string ${searchString}`, () => {
      cy.get('.search')
        .type(searchString)

      cy.get('.sgCard')
        .should('have.length', 7)
        .each((sgCard, idx) => {
          const href = sgCard.parent().attr('href');
          expect(href).to.include(searchString);
        });
    })

    it('should generate user friendly url', () => {
      cy.server();

      cy.route({ method: "GET", url: 'http://api.khajana.org/v2/banis' })
        .as('sgBanis')

      cy.wait('@sgBanis').then(banis => {
        const banisData = banis.response.body;
        const baniLinks = banisData.map(({ transliteration }) => `/sundar-gutka/${sanitizeBaani(transliteration).split(' ').join('-')}`);
        const randomIdx = getRandomNumber(baniLinks.length);
        const lastIdx = baniLinks.length - 1;

        cy.get('.sgCard').each((sgCard, idx) => {
          // we gonna check just 3 random indexes
          if (idx === 0 ||
            idx === randomIdx ||
            idx === lastIdx) {
            const href = sgCard.parent().attr('href');
            expect(href).to.equal(baniLinks[idx])
          }
        });
      })
    })

    it('should work correctly using controls from settings panel', () => {

    })
  })