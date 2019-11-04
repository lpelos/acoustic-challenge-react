import React from 'react';

import './Article.scss';

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = { article: null, isLoading: false };
  }

  componentDidMount() {
    if (this.props.params) { this.setState({ isLoading: true }); }
  }

  render() {
    const { article, isLoading } = this.state;

    return (
      <div className="Article">
        {isLoading && <p className="loading text-center my-5">Loading content...</p>}
      </div>
    );
  }
}

export default Article;
