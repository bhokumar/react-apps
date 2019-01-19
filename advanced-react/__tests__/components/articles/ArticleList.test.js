import React from 'react';
import renderer from 'react-test-renderer';
import ArticleList from '../../../lib/components/articles/ArticleList';

describe('ArticleList',() => {
  const testProps = {
    articles : {
      a: {id:'a'},
      b : {id : 'b'}
    },
    articleActions : {
      lookUpAuthor : jest.fn(() => ({}))
    }
  };

  it('ArticleList rnders correctly', () => {
    const tree = renderer.create(
      <ArticleList {...testProps}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree.children.length).toBe(2);
  });
});
