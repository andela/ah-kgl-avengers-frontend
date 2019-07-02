describe('Should display the profile page', () => {
  beforeEach(() => {
    cy.visit('/user');
    cy.server(); // enable response stubbing
  });
  it('Should get all the main elements on the page', () => {
    cy.get('.container-profile-view').should('exist');

    cy.get('button').should('have.class', 'btn-profile-followers');

    cy.get('.btn-follow-profile')
      .should('exist')
      .should('have.text', 'account_circlefollow');

    cy.get('.btn-outline-inverse.m-1.btn.btn-outline-primary')
      .should('exist')
      .should('have.text', 'SIGN IN');

    cy.get('.profile-user-bio').should('exist');
    cy.get('.profile-user-email').should('exist');
    cy.get('.profile-username').should('exist');
    cy.get('.profile-articles-container').should('exist');
  });
});
