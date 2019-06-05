import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

ReactDOM.render(<App />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept('./app', () => {
    const NextApp = App;
    ReactDOM.render(<NextApp />, document.getElementById('app'));
  });
}
