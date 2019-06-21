// describe('App Test', () => {
//   beforeEach(() => {
//     cy.visit('/');
//   });

//   it.only('Visit the app', () => {
//     // check if we have tha class container
//     // cy.get('.nav-top').should('be.visible');

//     // check if in the DOM there exist the class called app-title and has text Home
//     cy.get('.nav-logo').should('exist');
//     cy.get('img').should('exist');

//     cy.get('.ml-auto').should('exist');
//   });

//   it('Visit the Sign Up', () => {
//     // test the SIGN IN button
//     cy.get('.btn-outline-inverse').should('have.text', 'SIGN IN');

//     // test the GER STARTED  button
//     cy.get('.btn-outline').should('have.text', 'GET STARTED').click();

//     // check if we redirected to the same page
//     cy.location('pathname').should('eq', '/signup');
//   });

//   it('Test Items', () => {
//     const textLinks = 'MONEYSTARTUPSRELIGIONSELF-DEVELOPMENTPOLITICSTECHBUSINESS';

//     cy.get('.collapse').should('exist');
//     cy.get('ul').should('have.class', 'navbar-nav');
//     cy.get('li').should('have.class', 'nav-item');
//     cy.get('.nav-item').should('have.text', textLinks);
//   });

//   it('Test Footer', () => {
//     cy.get('ul').should('exist');

//     // check if we have tha class container
//     cy.get('.footer-copyright').should('be.visible');

//     cy.get('span').should('have.text', '© AuthorsHaven 2019');
//   });
// });
