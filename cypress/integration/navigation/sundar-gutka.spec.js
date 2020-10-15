import { getRandomNumber } from '../../utils';
import { sanitizeBaani } from '../../../src/js/pages/SundarGutka/utils';

describe('Navigation', () => {
  const sttmLarivaarAssistColor = 'rgb(243, 156, 29)';
  const sundarGutkaBaanis = 104;
  const searchString = 'jaa';

  describe('Sundar-Gutka page', () => {
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

    it('should open correct baani on clicking sundar gutka card', () => {

      cy.get('.sgCard')
        .first()
        .click()

      cy.url().should('contain', '/sundar-gutka/gur-mantr');
    })

    it(`should display appriopriate number of cards on searching with string ${searchString}`, () => {
      cy.get('.search')
        .type(searchString)

      cy.get('.sgCard')
        .should('have.length', 7)
        .each((sgCard, _) => {
          const href = sgCard.parent().attr('href');
          expect(href).to.include(searchString);
        });
    })

    it('should generate user friendly url', () => {
      cy.server();

      cy.route({ method: "GET", url: 'http://api.khajana.org/v2/banis' })
        .as('sgBaanis')

      cy.wait('@sgBaanis').then(baanis => {
        const baanisData = baanis.response.body;
        const baaniLinks = baanisData.map(({ transliteration }) => `/sundar-gutka/${sanitizeBaani(transliteration).split(' ').join('-')}`);
        const randomIdx = getRandomNumber(baaniLinks.length);
        const lastIdx = baaniLinks.length - 1;

        cy.get('.sgCard').each((sgCard, idx) => {
          // we gonna check just 3 random indexes
          if (idx === 0 ||
            idx === randomIdx ||
            idx === lastIdx) {
            const href = sgCard.parent().attr('href');
            expect(href).to.equal(baaniLinks[idx])
          }
        });
      });

    })

    it('should work correctly when using different controls in settings panel', () => {

      cy.get('.sgCard')
        .eq(0)
        .click()

      // clicked on the paragraph tool
      cy.get('[data-cy=Paragraph] > .custom-fa').click();

      cy.get('.mixed-view-baani.paragraph-mode')
        .should('exist');

      cy.get('[data-cy=Larivaar] .custom-fa-assist').click();

      cy.get('.larivaar.gurlipi')
        .first()
        .find('.larivaar-assist-word').each((words, _) => {
          words.each((idx, word) => {
            cy.wrap(word).should('have.css', 'color', sttmLarivaarAssistColor);
          })
        })
    })

  })
})
