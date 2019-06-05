import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './app';
import store from './redux/store/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);

if (module.hot) {
  module.hot.accept('./app', () => {
    const NextApp = App;
    ReactDOM.render(
      <Provider>
        <NextApp />
      </Provider>,
      document.getElementById('app'),
    );
  });
}
