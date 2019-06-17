/*
 * The initial store will be defined here
 * and all the changes can be added for the initial store as the project grows
 */

export default {
  user: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI1NTlmNWIxLTk5MTktNGZlMC1iNGY0LWE2ZjRmMjYwY2I1NyIsInJvbGUiOiJ1c2VyIiwiZW1haWwiOiJ1c2VyQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoidXNlciIsImlhdCI6MTU2MDg1MTY1MywiZXhwIjoxNTYwODU1MjUzfQ.g_hBBm5sO9ikwUDmlk3yX7cPdhsS2ZkdaFqAykvVeoY',
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
  drafts: null,
  articles: [],
  message: { type: '', text: [] },
};
