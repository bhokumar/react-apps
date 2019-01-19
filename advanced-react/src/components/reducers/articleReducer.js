import articleActions from '../actions/ArticleActionTypes';

const initiaState = {
  articles : [],
  fetchingArticles : false,
  fetchedArticles : false
};

const articleReducer = (state = initiaState,action) => {
  switch (action.type) {
  case articleActions.FETCH_ARTICLES:
    return {...state, fetchingArticles : true};
  default:
    return {...state};
  }
}
;
export default articleReducer;
