import React, { useState } from 'react';
import { render } from 'react-dom';
import SearchParams from './SearchParams';
import { Router } from '@reach/router';
import Details from './Details';
import ThemeContext from './ThemeContext';
import NavBar from './NavBar';

const App = () => {
  const themeHook = useState('darkblue');
  return (
    <React.StrictMode>
      <ThemeContext.Provider value = {themeHook}>      
        <div>
          {/* <header>
            <Link to="/">Adopt Me!</Link>
          </header> */}
          <NavBar />
          <Router>
            <SearchParams path="/" />
            <Details path="/details/:id" />
          </Router>
          
        </div>
      </ThemeContext.Provider>
    </React.StrictMode>
  )
};
render(
  <App />,
  document.getElementById("root")
);