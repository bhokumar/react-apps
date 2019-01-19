import DataApi from '../../data/DataApi';
import {data} from '../../data/testData.json';


const api = new DataApi(data);

describe('DataApi' , () => {
  it('Expose Articles as an object', () => {
    const articles = api.getArticles();
    const articleId = data.articles[0].id;
    const articleTitle = data.articles[0].title;
    expect(articles).toHaveProperty(articleId);
    expect(articles[articleId].title).toBe(articleTitle);
  });

  it('Expose Authors as an object', () => {
    const authors = api.getAuthors();
    const authorId = data.authors[0].id;
    const authorFirstName = data.authors[0].firstName;
    expect(authors).toHaveProperty(authorId);
    expect(authors[authorId].firstName).toBe(authorFirstName);
  });

  it('Dummy Test', ()=>{

  });
});
