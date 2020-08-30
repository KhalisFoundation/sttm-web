import { SEARCH_TYPES } from '../../../src/js/constants';
const searchType = SEARCH_TYPES.GURMUKHI_WORD.toString();

describe('Search', () => {
  const searchString = 'sMqoK';
  const showAllResultsBtn = 'Show full results';
  const { sttmBlue } = Cypress.env().colors;

  describe('Full Word(G)', () => {
    beforeEach(() => {
      cy.visit('/');

      cy.get('.toast-notification-close-button')
        .click();

      cy.get('#search-type')
        .select(searchType);
    });

    it(`should return search results for ${searchString} in drop-down`, () => {
      cy.get('#search')
        .type(searchString);

      cy.get('.search-result span')
        .should('contain', ' sMqoKI') //Santokhi
        .should('contain', ' sMqoKu') //Santokhu
        .should('contain', 'sMqoK') //Santokh
    });

    it(`should return highlight search result words for  ${searchString} in drop-down`, () => {
      cy.get('#search')
        .type(searchString);

      cy.get('.search-highlight-word')
        .should('contain', ' sMqoKI') //Santokhi
        .should('contain', ' sMqoKu') //Santokhu
        .should('contain', 'sMqoK') //Santokh
        .should('have.css', 'color', sttmBlue)
    })

    it.only(`should contain ${searchString2} in first letters of the words [in results]`, () => {

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

    //   it(`should open all search results page on clicking the ${showAllResultsBtn} button`, () => {

    //     cy.get('#search')
    //       .type(searchString2)

    //     cy.get('#suggestions')
    //       .as('suggestions')

    //     cy.get('@suggestions')
    //       .scrollTo('bottom')
    //       .find('.show-all-results a')
    //       .should('exist')
    //       .scrollIntoView()
    //       .click({ force: true })

    //     cy.url().should('include', `/search?q=${searchString2}&type=${searchType}&source=G`);
    //   })
    // })
  })
