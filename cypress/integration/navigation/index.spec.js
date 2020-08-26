import { raagIndices } from '../../../src/js/pages/GranthIndex/constants/raag-indices';

describe('Navigation', () => {
  context('Index', () => {

    const { SGGS, DG } = raagIndices;
    const totalSggsRows = SGGS.indices.length;
    const totalSdgsRows = DG.indices.length;
    const totalAmritKeertanRows = 113;

    const firstSggsRaagName = SGGS.indices[0].name;
    const lastSggsRaagName = SGGS.indices[totalSggsRows - 1].name;
    const firstSdgsRaagName = DG.indices[0].name;
    const lastSdgsRaagName = DG.indices[totalSdgsRows - 1].name;

    beforeEach(() => {
      cy.visit('/');

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

      cy.get('@dgRows').should('have.length', totalSdgsRows)
      cy.get('@dgRows').first().find('td').first().should('contain.text', firstSdgsRaagName);
      cy.get('@dgRows').first().find('td').first().should('contain.text', lastSdgsRaagName);

      // AmritKeertan Granth
      cy.get('.granthIndex')
        .eq(2)
        .find('tbody tr').as('amritKeertanRows')

      cy.get('@amritKeertanRows').should('have.length', totalAmritKeertanRows);
      cy.get('@amritKeertanRows').first().find('td summary').should('contain.text', 'ਦੁਇ ਕਰ ਜੋੜਿ ਕਰਉ ਅਰਦਾਸਿ ॥');
      cy.get('@amritKeertanRows').last().find('td summary').should('contain.text', 'ਰਹਿਣੀ ਰਹੈ ਸੋਈ ਸਿਖ ਮੇਰਾ');
    })


    it.only('should open correct shabads on clicking ang ranges', () => {

      function getRandomNumber(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }

      const sggsIndices = SGGS.indices.map(raagObj => raagObj.pages).flat();
      const dgIndices = DG.indices.map(raagObj => raagObj.pages).flat();

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

      // SGGS Granth
      cy.checkGranthIndices({ granthIndex: 0, source: 'G', indices: sggsIndices });

      // DG Granth
      cy.checkGranthIndices({ granthIndex: 1, source: 'D', indices: dgIndices })

    });
  })
})