// describe('Signup Test', () => {
//   beforeEach(() => {
//     cy.visit('/signup');
//     cy.server(); // enable response stubbing
//   });

//   it('Should get Main components', () => {
//     // should get the main div
//     cy.get('.wrapper').should('exist');

//     cy.get('.row').should('exist');

//     cy.get('.col-12').should('have.class', 'sign-up');

//     cy.get('h1')
//       .should('have.class', 'tagline')
//       .should('contain', 'If you do not express your own original ideas')
//       .should('contain', 'You will have betrayed yourself');

//     cy.get('img').should('have.class', 'img-fluid');

//     // check the form

//     cy.get('form').should('exist');
//     cy.get('h3')
//       .should('have.class', 'sign-up-title')
//       .should('have.text', 'signup');

//     cy.get('.form-group').should('exist');
//   });

//   it('Should be able to return all required errors', () => {
//     cy.route({
//       method: 'POST',
//       url: '/api/v1/auth/signup',
//       response: {
//         user: {
//           email: 'username@andela.com',
//           username: 'username',
//         },
//       },
//     });

//     // should submit the information from the form
//     cy.get('.sign-up-btn').click();
//     cy.get('.error').should(
//       'have.text',
//       'Username is RequiredEmail is not ValidPassword is Required',
//     );
//   });

//   it('Should be able to return the password validation error', () => {
//     // cy.visit('/signup');
//     cy.route({
//       method: 'POST',
//       url: '/api/v1/auth/signup',
//       response: {
//         user: {
//           email: 'username@andela.com',
//           username: 'username',
//         },
//       },
//     });

//     cy.get('input[name="username"]').type('username');
//     cy.get('input[name="email"]').type('usersname@andela.com');
//     cy.get('input[name="password"]').type('es');

//     // should submit the information from the form
//     cy.get('.sign-up-btn').click();
//     cy.get('.error').should('have.text', 'Password has to be more than 8 characters');
//   });

//   it('Should be able to sign up the user', () => {
//     cy.route({
//       method: 'POST',
//       url: '/api/v1/auth/signup',
//       status: 201,
//       response: {
//         user: {
//           email: 'username@andela.com',
//           username: 'username',
//         },
//       },
//     });
//     // should enter the required information in the form
//     cy.get('input[name="username"]').type('username');
//     cy.get('input[name="email"]').type('username@andela.com');
//     cy.get('input[name="password"]').type('test1234');

//     // should submit the information from the form
//     cy.get('.sign-up-btn').click();

//     // check if we redirected to the other page
//     cy.location('pathname').should('eq', '/signup');
//   });
// });
