const optRequest = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const actionDispatch = (type, payload) => ({
  type,
  payload,
});
export {
  optRequest,
  actionDispatch,
};
