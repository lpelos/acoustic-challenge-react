import React, { useState } from 'react';

import './ArticleParamsForm.scss';

import Input from '../input';

const UUID_REGEXP = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const ArticleParamsForm = ({ onSubmit }) => {
  const [touched, setTouched] = useState({
    contentHubId: false,
    contentId: false,
  });

  const [value, setValue] = useState({ contentHubId: '', contentId: '' });

  const isValid = !Object.keys(value).some(errorMessage);

  function errorMessage(fieldName) {
    const fieldValue = value[fieldName];
    if (!fieldValue || !fieldValue.trim()) { return 'cannot be blank'; }
    if (!UUID_REGEXP.test(fieldValue)) { return 'invalid UUID'; }
    return null;
  }

  function handleBlur(fieldName) {
    setTouched(state => ({ ...state, [fieldName]: true }));
  }

  function handleChange(fieldName, value) {
    setValue(state => ({ ...state, [fieldName]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (onSubmit && isValid) { onSubmit({ ...value }); }
  }

  return (
    <form className="ArticleParamsForm card mx-auto" onSubmit={handleSubmit}>
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
          invalidFeedback={errorMessage('contentHubId')}
          label="Content Hub ID*"
          name="contentHubId"
          placeholder="Ex: 779181bc-40f8-4e49-bc76-7f820485e3ac"
          touched={touched.contentHubId}
          valid={!errorMessage('contentHubId')}
          value={value.contentHubId}
          onBlur={() => handleBlur('contentHubId')}
          onChange={v => handleChange('contentHubId', v)}
        />

        <Input
          className="content-id-group"
          id="contentIdInput"
          invalidFeedback={errorMessage('contentId')}
          label="Content ID*"
          name="contentId"
          placeholder="Ex: fa0e68fd-deb8-4539-806a-83c8b97e692a"
          touched={touched.contentId}
          valid={!errorMessage('contentId')}
          value={value.contentId}
          onBlur={() => handleBlur('contentId')}
          onChange={v => handleChange('contentId', v)}
        />
      </main>

      <footer className="card-footer text-right">
        <button className="btn btn-primary" disabled={!isValid} type="submit">
          Render Content
        </button>
      </footer>
    </form>
  );
};

export default ArticleParamsForm;
