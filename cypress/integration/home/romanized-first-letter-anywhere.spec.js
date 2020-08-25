import { SEARCH_TYPES } from '../../../src/js/constants';
const searchType = SEARCH_TYPES.ROMANIZED_FIRST_LETTERS_ANYWHERE.toString();

describe('Home page Search tests', () => {
  let searchString = 'jmtatssd';

  describe('Romanized First Letter Search anywhere(E)', () => {
    beforeEach(() => {
      cy.visit('/');

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

    before(() => {
      searchString = 'jmta';
    })

    it.only(`should contain ${searchString} in first letters of the words [in results]`, () => {
      cy.get('#search')
        .type(searchString);

      cy.get('.search-result li:first-child .search-highlight-word').as('result')

      cy.get('@result').then(searchHighlightedWordsNodes => {
        const firstLetters = [];

        // Getting the first letters of the highlighted words.
        searchHighlightedWordsNodes.each((idx, highlightedNode) => {
          const highlightedWord = highlightedNode.textContent.trim();
          firstLetters.push(highlightedWord[0]);
        });

        expect(firstLetters.join('').toLowerCase()).to.contains(searchString);
      });
    })
  })