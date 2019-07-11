const optRequest = () => ({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

const actionDispatch = (type, payload) => ({
  type,
  payload,
});
export {
  optRequest,
  actionDispatch,
};
