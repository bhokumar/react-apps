import React from 'react';
import {connect} from 'react-redux';
import * as courseAction from '../../actions/articleActionCreator';

class AddArticle extends React.Component{
    constructor(props,context){
        super(props,context);

        this.state = {
            article:{title:""}
        };

        this.onTitleChnage = this.onTitleChnage.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
    }

    onTitleChnage(event){
        const article = this.state.article;
        article.title = event.target.value;
        this.setState({article:article});
    }

    onClickSave(event){
        this.props.dispatch(courseAction.createArticleAction(this.state.article));
    }

    articleRow(article,index){
        return <div key={index}>{article.title}</div>;
    }

    render(){
        return(
            <div>
                <h2>Add Articles</h2>
                {this.props.articles.map(this.articleRow)}
                <input type="text" onChange={this.onTitleChnage} value={this.state.article.title}/>
                <input type="submit" value="Save" onClick={this.onClickSave}/>
            </div>
        );
    }
}
function mapStateToProps(state,ownProps){
    return{
        articles:state.articles
    };
}

export default connect(mapStateToProps)(AddArticle);