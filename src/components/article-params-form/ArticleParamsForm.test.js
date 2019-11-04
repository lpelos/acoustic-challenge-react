import React from 'react';
import ReactDOM from 'react-dom';

import ArticleParamsForm from './ArticleParamsForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ArticleParamsForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
