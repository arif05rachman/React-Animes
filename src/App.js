import React from 'react';
import Home from './views/Home';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/index'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Provider store={store}>
          <Home />
        </Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
