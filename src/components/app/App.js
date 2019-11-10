import React from 'react';

import logo from '../../assets/images/logo.png';
import './App.scss';

import Article from '../article';
import ArticleParamsForm from '../article-params-form';

class App extends React.Component {
  state = { articleParams: null };

  handleClose() {
    this.setState({ articleParams: null });
  }

  handleParamsSubmit(articleParams) {
    this.setState({ articleParams });
  }

  render() {
    const { articleParams } = this.state;

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

        {!articleParams && <ArticleParamsForm
          onSubmit={params => this.handleParamsSubmit(params)}
        />}

        {articleParams && <Article
          params={articleParams}
          onClose={() => this.handleClose()}
        />}
      </div>
    );
  }
}

export default App;
