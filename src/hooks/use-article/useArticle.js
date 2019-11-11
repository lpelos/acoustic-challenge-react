import { useEffect, useState } from 'react';

import ArticleService from '../../utils/article-service';

const defaultArticleService = new ArticleService();

function useArticle({
  articleService = defaultArticleService,
  contentHubId,
  contentId,
}) {
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setArticle(null);
    setError(null);

    if (!contentHubId || !contentId) { return; }

    setIsLoading(true);
    articleService.find({ contentHubId, contentId })
      .then(setArticle, setError)
      .then(() => setIsLoading(false));
  }, [articleService, contentHubId, contentId]);

  return { article, error, isLoading };
};

export default useArticle;
