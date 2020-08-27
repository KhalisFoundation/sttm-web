import { raagIndices } from '../../../src/js/pages/GranthIndex/constants/raag-indices';

const getRandomNumber = (max) => Math.floor(Math.random() * Math.floor(max));

Cypress.Commands.add('checkGranthIndices', function checkGranthIndices({ granthIndex, indices, source }) {
  const randomIndex = getRandomNumber(indices.length);

  cy.get('.granthIndex')
    .eq(granthIndex)
    .find('tbody tr')
    .as('granthRows')

  cy.get('@granthRows')
    .find('td a')
    .then(anchors => {
      anchors.each((idx, anchor) => {
        // we just gonnna check 3 indexes
        if (idx === 0 ||
          idx === indices.length - 1 ||
          idx === randomIndex) {
          const ang = indices[idx];
          const href = anchor.getAttribute('href');
          expect(href).to.includes(`/ang?ang=${ang}&source=${source}`);
        }
      });
    });
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
  context('Index', () => {

    const { SGGS, DG } = raagIndices;
    const totalSggsRows = SGGS.indices.length;
    const totalDgRows = DG.indices.length;
    const totalAmritKeertanRows = 113;

    const firstSggsRaagName = SGGS.indices[0].name;
    const lastSggsRaagName = SGGS.indices[totalSggsRows - 1].name;
    const firstDgRaagName = DG.indices[0].name;
    const lastDgRaagName = DG.indices[totalDgRows - 1].name;

    beforeEach(() => {
      cy.visit('/');

      cy.get('.toast-notification-close-button')
        .click();

      cy.get('li[data-cy=index] a')
        .click();

    })

    it('should open with indexes of SGGS, SDGS, Amrit Keertan', () => {

      // SGGS Granth
      cy.get('.granthIndex')
        .eq(0)
        .find('tbody tr')
        .as('sggsRows')

      cy.get('@sggsRows').should('have.length', totalSggsRows)
      cy.get('@sggsRows').first().find('td').first().should('contain.text', firstSggsRaagName);
      cy.get('@sggsRows').last().find('td').first().should('contain.text', lastSggsRaagName);

      // DG Granth
      cy.get('.granthIndex')
        .eq(1)
        .find('tbody tr').as('dgRows')

      cy.get('@dgRows').should('have.length', totalDgRows)
      cy.get('@dgRows').first().find('td').first().should('contain.text', firstDgRaagName);
      cy.get('@dgRows').last().find('td').first().should('contain.text', lastDgRaagName);

      // AmritKeertan Granth
      cy.get('.granthIndex')
        .eq(2)
        .find('tbody tr').as('amritKeertanRows')

      cy.get('@amritKeertanRows').should('have.length', totalAmritKeertanRows);
      cy.get('@amritKeertanRows').first().find('td summary').should('contain.text', 'ਦੁਇ ਕਰ ਜੋੜਿ ਕਰਉ ਅਰਦਾਸਿ ॥');
      cy.get('@amritKeertanRows').last().find('td summary').should('contain.text', 'ਰਹਿਣੀ ਰਹੈ ਸੋਈ ਸਿਖ ਮੇਰਾ');
    })


    it('should open correct shabads on clicking ang ranges', () => {
      const sggsIndices = SGGS.indices.map(raagObj => raagObj.pages).flat();
      const dgIndices = DG.indices.map(raagObj => raagObj.pages).flat();

      // SGGS Granth
      cy.checkGranthIndices({ granthIndex: 0, source: 'G', indices: sggsIndices });

      // DG Granth
      cy.checkGranthIndices({ granthIndex: 1, source: 'D', indices: dgIndices })

    });

    context('Amrit Keertan', () => {
      it('should open shabads on clicking Amrit keertan chapter', () => {
        cy.loadAmritKeertanFirstChapter();
      })

      it('should go to correct shabad, on clicking Amrit Keertan shabad link', () => {
        cy.loadAmritKeertanFirstChapter();

        // Clicking on first chapter, will change the url
        cy.get('@firstChapterShabads')
          .first()
          .find('a')
          .scrollIntoView()
          .click({ force: true })

        cy.url().should('include', '/amrit-keertan/shabads/816');
      })
    })
  })
})