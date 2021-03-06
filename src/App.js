import React from 'react';
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
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Simple PrivCloud React App</h1>
        </header>
        <div className="App-content">
          <h5>
            Example code can be found{' '}
            <a href="https://github.com/privcloud-com/example-react-application" target="_blank" rel="noreferrer">here</a>
          </h5>
        </div>
        <Records />
      </div>
    </Provider>
  )
}

export default App;
