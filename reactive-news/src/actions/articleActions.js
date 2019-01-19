import articleActions from './articleActionTypes';

export function createArticleAction(article){
    return{type:articleActions.CREATE_ARTICLE,article};
}