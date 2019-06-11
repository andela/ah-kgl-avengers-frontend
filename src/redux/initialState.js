/*
 * The initial store will be defined here
 * and all the changes can be added for the initial store as the project grows
 */

export default {
  user: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNiMmZlNGFiLWMyODMtNDAyMy04MTJhLTQ5NGZhYjMzNGFlNCIsInJvbGUiOiJ1c2VyIiwiZW1haWwiOiJ2YWJpbWFuYUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InBhdWwiLCJpYXQiOjE1NjA0NzE2NDYsImV4cCI6MTU2MDQ3NTI0Nn0.tzoJM3qj4h0iv8l1IQcdSIxBdxZeAtR1QIiPejx6RFc',
  },
  register: {},
  currentUser: {},
  isProgressOn: false,
  redirect: {},
  signUp: {
    username: '',
    email: '',
    errors: [],
  },
  login: {
    username: null,
    email: '',
    errors: [],
  },
  article: {},
  message: { type: '', text: [] },
};
