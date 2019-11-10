import moment from 'moment';
import React from 'react';

import './Article.scss';

import { AcousticContentNotFoundError } from '../../utils/acoustic-content-client';
import ArticleService from '../../utils/article-service';

const ArticleAuthor = ({ article }) => {
  if (!article.author) { return null; }
  return <span>By <em className="author">{article.author}</em></span>;
}

const ArticleBody = ({ article }) => {
  if (!article.body || article.body.length === 0) {
    return <p className="text-secondary">[No content body]</p>;
  }

  return (
    <main className="body">
      {article.body.map((html, index) => {
        return <ArticleBodyItem html={html} key={index.toString()} />
      })}
    </main>
  )
}

const ArticleBodyItem = ({ html }) => {
  return <section dangerouslySetInnerHTML={{ __html: html }}></section>
};

const ArticleContent = ({ article }) => {
  if (!article) { return null; }

  return (
    <article>
      <ArticleHeader article={article} />
      <ArticleMainImage article={article} />
      <ArticleBody article={article} />
    </article>
  );
};

const ArticleDate = ({ article }) => {
  if (!article.date) { return null; }

  const formatedDate = moment(article.date).utcOffset(3).format('lll');
  return <span className="date">{formatedDate}</span>;
};

const ArticleError = ({ error, params }) => {
  if (!error) { return null; }

  const errorType = error instanceof AcousticContentNotFoundError
    ? 'notFound'
    : 'unexpected';

  const className = errorType === 'notFound'
    ? 'not-found-error'
    : 'unexpected-error';

  return (
    <div className={`${className} alert alert-danger`} role="alert">
      <h2 className="alert-heading">Error fetching content</h2>

      {errorType === 'notFound' && <ArticleNotFoundError params={params} />}
      {errorType !== 'notFound' && <ArticleUnexpectedError params={params} />}
    </div>
  );
}

const ArticleNotFoundError = ({ params }) => {
  return (
    <div>
      <p>
        It wasn't possible to fetch any content for the given <em>API Key</em> and <em>Content ID</em>. Please double check the article params and try again.
      </p>

      <ul className="list-unstyled">
        <li>
          <strong>API Key:</strong> {params.contentHubId || '[none]'}
        </li>
        <li>
          <strong>Content ID:</strong> {params.contentId || '[none]'}
        </li>
      </ul>
    </div>
  );
};

const ArticleUnexpectedError = ({ params }) => {
  return (
    <div>
      <p>
        An unexpected error has occured. Please double check the given <em>API Key</em> and try again.
      </p>
      <p>
        If the error persist, try again later or contact <a href="mail:lucas.pelos@gmail.com">lucas.pelos@gmail.com</a>.
      </p>
      <p>
        <strong>API Key:</strong> {params.contentHubId || '[none]'}
      </p>
    </div>
  );
}

const ArticleHeader = ({ article }) => {
  return (
    <header>
      <ArticleHeading article={article} />
      <ArticleMetadata article={article} />
    </header>
  );
};

const ArticleHeading = ({ article }) => {
  const className = article.heading ? '' : 'text-secondary';
  return <h1 className={className}>{article.heading || '[No Heading]'}</h1>;
};

const ArticleMainImageCaption = ({ mainImage }) => {
  if (!mainImage.caption) { return null; }

  return (
    <figcaption className="figure-caption">{mainImage.caption}</figcaption>
  );
};

const ArticleMainImageCredit = ({ mainImage }) => {
  if (!mainImage.credit) { return null; }

  return (
    <footer>
      <small className="text-secondary">
        Credit: <em className="credit">{mainImage.credit}</em>
      </small>
    </footer>
  );
};

const ArticleMainImage = ({ article }) => {
  if (!article.mainImage) { return null; }
  const { mainImage } = article;

  return (
    <figure className="figure">
      <img
        alt={mainImage.caption}
        className="figure-img img-fluid rounded"
        src={mainImage.url}
      />

      <ArticleMainImageCaption mainImage={mainImage} />
      <ArticleMainImageCredit mainImage={mainImage} />
    </figure>
  );
};

const ArticleMetadata = ({ article }) => {
  if (!article.author && !article.date) { return null; }

  return (
    <p className="metadata text-secondary">
      <ArticleAuthor article={article} />
      <ArticleDate article={article} />
    </p>
  )
};

class Article extends React.Component {
  state = {
    article: null,
    error: null,
    isLoading: false,
  };

  constructor(props) {
    super(props);
    this.service = props.articleService || new ArticleService();
  }

  componentDidMount() {
    this.fetchArticle();
  }

  fetchArticle() {
    this.setState({
      article: null,
      error: null,
      isLoading: true,
    });

    if (!this.props.params) { return; }

    const { contentHubId, contentId } = this.props.params;

    this.service.find({ contentHubId, contentId }).then(
      article => { this.setState({ article, isLoading: false }); },
      error => { this.setState({ error, isLoading: false }); },
    );
  }

  render() {
    const { onClose, params } = this.props;
    const { article, error, isLoading } = this.state;

    if (isLoading) {
      return <p className="loading text-center my-5">Loading content...</p>;
    }

    return (
      <div className="Article">
        <ArticleContent article={article} />
        <ArticleError error={error} params={params} />

        <button className="btn btn-link mb-4" onClick={onClose} type="button">
          {'<'} Go back
        </button>
      </div>
    );
  }
}

export default Article;
