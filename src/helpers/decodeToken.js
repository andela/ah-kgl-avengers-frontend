export default {
  decodeToken: () => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (Date.now() > payload.exp * 1000) {
        return null;
      }
      return payload;
    }
    return null;
  },
};
