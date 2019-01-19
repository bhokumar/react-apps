import  React from 'react';

import ArticleForm from './ArticleForm';

class ManageArticle extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            article:{id:'',firstName:'',lastName:''}
        };

        this.setArticleState = this.setArticleState.bind(this);
    }

    setArticleState(event){
        let field = event.target.name;
        let value = event.target.value;
        const article = this.state.article;
        article[field] = value;
        return this.setState({
            article:article
        });
    }

    render(){
        return(
            <div>
                <ArticleForm article={this.state.article} onChange={this.setArticleState}/>
            </div>
        );
    }
}

export default ManageArticle;