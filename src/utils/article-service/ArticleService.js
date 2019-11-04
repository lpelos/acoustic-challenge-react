import AcousticContentClient from '../acoustic-content-client';
import Article from '../../utils/Article';
import ArticleImage from '../../utils/ArticleImage';

class ArticleService {
  constructor(client = new AcousticContentClient()) {
    this.client = client;
  }

  articleFromJSON(json) {
    if (!json) { return null; }

    const { elements, id } = json;
    const { author, body, date, heading, mainImage } = elements;

    return new Article({
      author: author.value || '',
      body: body.values || [],
      date: date.value ? new Date(date.value) : null,
      heading: heading.value || '',
      id,
      mainImage: this.articleImageFromJSON(mainImage),
    });
  }

  articleImageFromJSON(json) {
    if (!json || !json.value) { return null; }

    const { leadImage, leadImageCaption, leadImageCredit } = json.value;
    const { url } = leadImage;

    return new ArticleImage({
      caption: leadImageCaption.value || '',
      credit: leadImageCredit.value || '',
      url: url ? this.client.resourceUrl(url) : '',
    });
  }

  find({ contentHubId, contentId }) {
    return this.client.contentItem(contentHubId, contentId).then(
      response => this.articleFromJSON(response.data),
    );
  }
}

export default ArticleService;
