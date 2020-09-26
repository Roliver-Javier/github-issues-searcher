import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { store } from './store/store';
import HomePage from './pages/homePage/homePage';
import { HOME_PAGE } from './global/routes';
import { Provider } from 'react-redux';
import ThemeContainer from './components/themeContainer/themeContainer';

const App = () => (
  <Provider store={store}>
    <Router>
      <ThemeContainer>
        <Route exact path={HOME_PAGE} component={HomePage} />
      </ThemeContainer>
    </Router>
  </Provider>
);

export default App;
