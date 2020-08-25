import { SEARCH_TYPES } from '../../../src/js/constants';
const searchType = SEARCH_TYPES.ROMANIZED_FIRST_LETTERS_ANYWHERE.toString();

describe('Home page Search tests', () => {
  const searchString = 'jmtatssd';
  const searchString2 = 'jmta';
  const showAllResultsBtn = 'Show full results';

  describe('Romanized First Letter Search anywhere(E)', () => {
    beforeEach(() => {
      cy.visit('/');

      cy
        .get('#toast-notification')
        .find('.toast-notification-close-button')
        .click();

      cy.get('#search-type')
        .select(searchType);
    });

    it(`should return search results for ${searchString} in drop-down`, () => {

      cy.get('#search')
        .type(searchString);

      cy.get('.search-result span')
        .should('contain', 'jo')
        .should('contain', 'mwgih')
        .should('contain', 'Twkur')
        .should('contain', 'Apuny')
        .should('contain', 'qy')
        .should('contain', 'soeI')
        .should('contain', 'soeI')
        .should('contain', 'dyvY')
    });

    it(`should contain ${searchString2} in first letters of the words [in results]`, () => {

      cy.get('#search')
        .type(searchString2);

      cy.get('.search-result li:first-child .search-highlight-word').as('result')

      cy.get('@result').then(searchHighlightedWordsNodes => {
        const firstLetters = [];

        // Getting the first letters of the highlighted words.
        searchHighlightedWordsNodes.each((idx, highlightedNode) => {
          const highlightedWord = highlightedNode.textContent.trim();
          firstLetters.push(highlightedWord[0]);
        });

        expect(firstLetters.join('').toLowerCase()).to.contains(searchString2);
      });
    })

    it(`should open all search results page on clicking the ${showAllResultsBtn} button`, () => {

      cy.get('#search')
        .type(searchString2)

      cy.get('#suggestions')
        .as('suggestions')

      cy.get('@suggestions')
        .scrollTo('bottom')
        .find('.show-all-results a')
        .should('exist')
        .scrollIntoView()
        .click({ force: true })

      cy.url().should('include', `/search?q=${searchString2}&type=${searchType}&source=G`);
    })
  })
})