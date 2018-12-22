import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from '../../axios';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: 1
    }

    componentDidMount(){
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
    }

    render () {
        const posts = this.state.posts.map((post, index)=>{
            return <Post 
                        key = {post.id} 
                        title = {post.title} 
                        author = {post.author}
                        clicked = {() => this.postSelected(post.id)}/>
        });
        return (
            <div>
                <section className="Posts">
                   {posts}
                </section>
                <section>
                    <FullPost id = {this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;