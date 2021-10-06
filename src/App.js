import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Records from './components/Records'

import configureStore from './store';

import logo from './logo.svg';
import './App.css';
import authService from './services/authService';

const store = configureStore();

function App() {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const response = await authService.login({
        email: 'arda@vantagepoint.co',
        password: 'foo1234',
      });
      localStorage.setItem('token', response.access_token);
      setIsLoaded(true);
    })();
  }, []);

  if (!isLoaded) {
    return <h6>Loading...</h6>;
  }

  return(
    <Provider store={store}>
      <BrowserRouter basename="/simple-application">
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Simple React App</h1>
          </header>
          <Switch>
            <Route exact path= "/" render={() => (
              <Redirect to="/privcloud/records"/>
            )}/>
            <Route exact path='/:type/records' component={Records} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App;
