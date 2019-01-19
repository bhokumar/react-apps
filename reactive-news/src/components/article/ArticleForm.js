import React from 'react';
class ArticleForm extends React.Component{
    render(){
        return(
            <form>
                <h1>Manage Author</h1>
                <label htmlFor="firstName">First Name</label>
                <input type="text"
                 name="firstName" 
                 className="form-control"
                placeholder="First Name" 
                ref="firstName" 
                value={this.props.article.firstName}
                onChange={this.props.onChange}/>
                <br/>
                <label htmlFor="lastName">Last Name</label>
                <input type="text"
                 name="lastName"
                  className="form-control"
                   placeholder="Last Name"
                    ref="lastName"
                     value={this.props.article.lastName}
                     onChange={this.props.onChange}/>
                <br/>
                <input type="submit" value="Save" className="btn btn-default"/>
            </form>
        );
    }
}

export default ArticleForm;