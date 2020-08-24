
describe('Home page Search tests', () => {
  const searchString = 'jmtaqssd';

  describe('Romanized First Letter Search anywhere(E)', () => {
    beforeEach(() => {
      cy.visit('/');

      cy.get('#search-type')
        .select('7');
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

    // it.only(`should contain ${searchString} in first letters of the words [in results]`, () => {
    //   cy.get('#search')
    //     .type(searchString);

    //   cy.get('.search-highlight-word').as('result')

    //   let firstLetterSearch = '';
    //   cy.get('@result').then(searchHighlightedWordsNodes => {
    //     console.log(searchHighlightedWordsNodes, 'NODES>>>>>')
    //     firstLetterSearch += result.innerHtml[0];
    //     console.log(firstLetterSearch, "FIRST LETTER SEARCH")
    //   });
    //   // console.log(firstLetterSearch)
    //   // const isMatched = firstLetterSearch.contains(searchString);
    //   // expect(isMatched).to.be.true;
    //   // console.log(firstLetterSearch);
    // })
  })