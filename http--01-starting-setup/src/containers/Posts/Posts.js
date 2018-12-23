import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';

import Post from '../../components/Post/Post';
import axios from '../../axios';
import FullPost from '../FullPost/FullPost';
import './Posts.css';

class Posts extends Component{
    state = {
        posts: [],
        selectedPostId: 1
    }

    componentDidMount(){
        console.log(this.props);
        axios.get('/posts/')
            .then(response =>{
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Bhoopendra'
                    }
                });
                this.setState({posts: updatedPosts});
            })
    }

    postSelected = (id) =>{
        this.setState({selectedPostId: id});
        this.props.history.push({pathname: this.props.match.url + '/' + id});
        //this.props.history.push('/' + id);
    }

    render(){
        const posts = this.state.posts.map((post, index)=>{
            return (
                //<Link to = {'/' + post.id} key = {post.id}>
                    <Post
                        key = {post.id}
                        title = {post.title} 
                        author = {post.author}
                        clicked = {() => this.postSelected(post.id)}/>
                //</Link>
                );
        });

        return(
            <div>
                <section className="Posts">
                    {posts}
                </section>  
                <Route path = {this.props.match.url + '/:id'} component = {FullPost}/>     
            </div>

        );
    }
}

export default Posts;