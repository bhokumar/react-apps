/**
 * Created by BHOOPENDRA on 12/22/2016.
 */
import React from 'react';

class  SideBar extends React.Component{
    constructor(props){
super(props);
        this.state = {
            content1 :"This is content1",
            content2: "This is Content2"
        }
    }
        render(){
        return(
        <div>
            <h3>Array: {this.props.propArray}</h3>
            <h3>Bool: {this.props.propBool ? "True..." : "False..."}</h3>
            <h3>Func: {this.props.propFunc(3)}</h3>
            <h3>Number: {this.props.propNumber}</h3>
            <h3>String: {this.props.propString}</h3>
            <h3>Object: {this.props.propObject.objectName1}</h3>
            <h3>Object: {this.props.propObject.objectName2}</h3>
            <h3>Object: {this.props.propObject.objectName3}</h3>

            <h5>{this.props.headerProps}</h5>
            <h1>{this.props.contentProps}</h1>
            <h5>{this.props.defaultProp1}</h5>
            <h5>{this.props.defaultProp2}</h5>
        </div>
        );
    }
}
SideBar.protoTypes = {
    propArray : React.PropTypes.array.isRequired,
    propBool : React.PropTypes.bool.isRequired,
    propFunc : React.PropTypes.func,
    propNumber : React.PropTypes.number,
    propString : React.PropTypes.string,
    propObject : React.PropTypes.object
}

SideBar.defaultProps = {
    propArray : [1,2,3,4],
    propBool : true,
    propFunc : function (e) {
        return e
    },
    propNumber : 4,
    propString : "This is prop String",
    propObject : {
        test1 : "this is test1",
        test2 : "this is test2"
    },
    defaultProp1 : "This is default Prop1",
    defaultProp2 : "This is default Prop2"
}
 export  default SideBar;