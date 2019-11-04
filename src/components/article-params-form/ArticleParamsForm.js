import React from 'react';

import './ArticleParamsForm.scss';

import Input from '../input';

const UUID_REGEXP = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

class ArticleParamsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      touched: { contentHubId: false, contentId: false },
      value: { contentHubId: '', contentId: '' },
    };

    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  errorMessage(fieldName) {
    const value = this.state.value[fieldName];
    if (!value || !value.trim()) { return 'cannot be blank'; }
    if (!UUID_REGEXP.test(value)) { return 'invalid UUDI'; }
    return null;
  }

  handleBlur(fieldName) {
    this.setState({ touched: { ...this.state.touched, [fieldName]: true } });
  }

  handleChange(fieldName, value) {
    this.setState({ value: { ...this.state.value, [fieldName]: value } });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { onSubmit } = this.props;
    if (!onSubmit) { return; }

    // TODO: validate

    const { contentHubId, contentId } = this.state.value;
    onSubmit({ contentHubId, contentId });
  }

  isValid() {
    return Object.keys(this.state.value).every(key => !this.errorMessage(key));
  }

  render() {
    const { touched, value } = this.state;

    return (
      <form
        className="ArticleParamsForm card mx-auto"
        onSubmit={this.handleSubmit}
      >
        <header className="card-header">
          <h1 className="card-title">Acoustic Content Renderer</h1>
        </header>

        <main className="card-body">
          <p>
            Please provide the <em>Content Hub ID</em> and <em>Content ID</em> of the content you want to be rendered.
          </p>

          <small className="text-secondary">
            See <a
              href="https://developer.ibm.com/customer-engagement/tutorials/getting-started-api-javascript/"
              rel="noopener noreferrer"
              target="_blank"
            >Docs</a> on how to get this information.
          </small>

          <Input
            className="content-hub-id-group"
            id="contentHubIdInput"
            invalidFeedback={this.errorMessage('contentHubId')}
            label="Content Hub ID*"
            name="contentHubId"
            placeholder="Ex: 779181bc-40f8-4e49-bc76-7f820485e3ac"
            touched={touched.contentHubId}
            valid={!this.errorMessage('contentHubId')}
            value={value.contentHubId}
            onBlur={this.handleBlur.bind(this, 'contentHubId')}
            onChange={this.handleChange.bind(this, 'contentHubId')}
          />

          <Input
            className="content-id-group"
            id="contentIdInput"
            invalidFeedback={this.errorMessage('contentId')}
            label="Content ID*"
            name="contentId"
            placeholder="Ex: fa0e68fd-deb8-4539-806a-83c8b97e692a"
            touched={touched.contentId}
            valid={!this.errorMessage('contentId')}
            value={value.contentId}
            onBlur={this.handleBlur.bind(this, 'contentId')}
            onChange={this.handleChange.bind(this, 'contentId')}
          />
        </main>

        <footer className="card-footer text-right">
          <button
            className="btn btn-primary"
            disabled={!this.isValid()}
            type="submit"
          >
            Render Content
          </button>
        </footer>
      </form>
    );
  }
}

export default ArticleParamsForm;