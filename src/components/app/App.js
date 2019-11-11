import React, { useState } from 'react';

import logo from '../../assets/images/logo.png';
import './App.scss';

import Article from '../article';
import ArticleParamsForm from '../article-params-form';

const App = ({ articleParams = null }) => {
  const [params, setParams] = useState(articleParams);

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

      {!params && <ArticleParamsForm onSubmit={p => setParams(p)} />}
      {params && <Article params={params} onClose={() => setParams(null)} />}
    </div>
  );
};

export default App;
