// describe('Should create an article', () => {
//   beforeEach(() => {
//     cy.visit('/new-post');
//     cy.server(); // enable response stubbing
//   });

//   it('Should get all the main elements on the page', () => {
//     cy.get('.editor-container').should('exist');

//     cy.get('.status').should('have.text', 'Draft');

//     cy.get('button').should('have.class', 'btn-save-edit');

//     cy.get('.zmdi-floppy').should('exist');

//     cy.get('.btn-save-edit')
//       .should('exist')
//       .should('have.text', 'Save');

//     cy.get('.btn-publish-edit')
//       .should('exist')
//       .should('have.text', 'Publish');

//     cy.get('.editor-wrapper').should('exist');

//     // cy.get('p').should('have.text', 'Your story here!');

//     // cy.get('h1').should('have.text', 'Your title here');

//     cy.get('.chips-label').should('have.text', 'Add tags:');
//   });

//   it('Should return on different occasions when adding an article', () => {
//     cy.get('.article-title').type('Hello world');

//     cy.get('.ck-editor__editable').type('Here is the test body');

//     cy.get('.zmdi-floppy').click();

//     cy.get('i').should('have.class', 'zmdi-info-outline');
//   });
// });
