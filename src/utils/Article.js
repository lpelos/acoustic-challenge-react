class Article {
  constructor({
    author,
    body = [],
    date,
    heading,
    id,
    mainImage,
  }) {
    this.author = author;
    this.body = body;
    this.date = date;
    this.heading = heading;
    this.id = id;
    this.mainImage = mainImage;
  }
}

export default Article;
