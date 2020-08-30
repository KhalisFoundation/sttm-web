import { buildApiUrl } from '@sttm/banidb';
import { API_URL } from '../../../common/constants';

import { SEARCH_TYPES } from '../../../src/js/constants';
const searchType = SEARCH_TYPES.GURMUKHI_WORD.toString();

describe('Search', () => {
  const searchString = 'sMqoK';
  const searchString2 = 'bhb';
  const searchString3 = 'Apwr';
  const showFullResults = 'Show full results';
  const { sttmBlue } = Cypress.env().colors;

  describe('Full Word(G)', () => {
    beforeEach(() => {
      cy.visit('/');

      cy.get('.toast-notification-close-button')
        .click();

      cy.get('#search-type')
        .select(searchType);
    });

    it(`should return search results for string: ${searchString} in drop-down`, () => {
      cy.get('#search')
        .type(searchString);

      cy.get('.search-result span')
        .should('contain', ' sMqoKI') //Santokhi
        .should('contain', ' sMqoKu') //Santokhu
        .should('contain', 'sMqoK') //Santokh
    });

    it(`should return highlight search result words for string: ${searchString} in drop-down`, () => {
      cy.get('#search')
        .type(searchString);

      cy.get('.search-highlight-word')
        .should('contain', ' sMqoKI') //Santokhi
        .should('contain', ' sMqoKu') //Santokhu
        .should('contain', 'sMqoK') //Santokh
        .should('have.css', 'color', sttmBlue)
    })

    it(`should open correct shabad page on clicking link in dropdown on search results of string: ${searchString}`, () => {
      cy.get('#search')
        .type(searchString);

      cy.get('.search-result li:first-child a')
        .click();

      cy.url().should('contain', `shabad?id=10&q=${searchString}&type=${searchType}&source=all&highlight=73`)
    })

    it(`should open "all search results page" on pressing  enter after searching for string: ${searchString2}`, () => {
      cy.get('#search')
        .type(searchString2);

      cy.get('.search-form').submit();

      cy.url().should('include', `/search?q=${searchString2}&type=${searchType}&source=all`);
    });

    it(`should open highlighted shabad on clicking or pressing enter for string: ${searchString3}`, () => {
      cy.server();

      cy.get('#search')
        .type(searchString3);

      const url = 'http:' + buildApiUrl({ offset: 1, source: 'all', q: searchString3, type: searchType, API_URL, livesearch: true });
      cy.route({ url }).as('result')

      cy.wait('@result')

      cy.get('#search')
        .click()
        .trigger('keydown', { keyCode: 40 }) //DownArrow
        .trigger('keydown', { keyCode: 13 }) //Enter

      cy.url().should('contain', `shabad?id=4&q=${searchString3}&type=${searchType}&source=all&highlight=31`)
    })

    it(`should open "all search results page" on clicking the ${showFullResults} link`, () => {

      cy.get('#search')
        .type(searchString2)

      cy.get('#suggestions')
        .scrollTo('bottom')
        .find('.show-all-results a')
        .should('exist')
        .scrollIntoView()
        .click({ force: true })

      cy.url().should('include', `/search?q=${searchString2}&type=${searchType}&source=all`);
    })
  })
})
