/**
 * Created by BHOOPENDRA on 12/25/2016.
 */
import React from 'react';

class TableContent extends React.Component{
    render(){
        return(
            <div>
                <div>{this.props.componentData.articleId}</div>
                <div>{this.props.componentData.courseID}</div>
                <div>{this.props.componentData.articleName}</div>
            </div>
        );
    }
}
export default TableContent;