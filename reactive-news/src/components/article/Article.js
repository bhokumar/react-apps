
import PropTypes from 'prop-types';
import React from 'react';

const Article = (props)=>{
    return(
        <div>
            {props.type}
            {props.content}
        </div>
    );
};
Article.protoTypes={
    type:ProtoTypes.isRequired
};

export default Article;