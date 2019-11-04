import React from 'react';

import logo from './assets/images/logo.png';
import './App.scss';

function App() {
  return (
    <div className="App container">
      <nav className="navbar navbar-light mb-4">
        <a
          className="navbar-brand"
          href="https://acoustic.co/"
          rel="noopener noreferrer"
          target="_blank"
          title="Go to Acoustic website"
        >
          <img alt="Acoustic" src={logo} />
        </a>
      </nav>

      <p>TODO: ArticleParamsForm component</p>
      <p>TODO: Article component</p>
    </div>
  );
}

export default App;
