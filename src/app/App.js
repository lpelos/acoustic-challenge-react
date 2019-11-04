import React from 'react';

import logo from '../assets/images/logo.png';
import './App.scss';

import ArticleParamsForm from './ArticleParamsForm';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { articleParams: null };

    this.handleParamsSubmit = this.handleParamsSubmit.bind(this);
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

        {!articleParams && <ArticleParamsForm onSubmit={this.handleParamsSubmit} />}
        {articleParams && <p>TODO: Article component</p>}
      </div>
    );
  }
}

export default App;
