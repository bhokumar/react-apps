import articleAction from '../actions/articleActionTypes';
const initialState ={
    fetchingArticle:false,
    fetchedArticle:false,
    fetchingArticleById:false,
    fetchedArticleById:false,
    articles:{}
}

export default function articleReducer(state=initialState,action){
    switch(action.type){
        case articleAction.CREATE_ARTICLE:
        return [...state,Object.assign({},action.article)];
        default:
        return state;
    }
}