/**
 * Created by BHOOPENDRA on 12/25/2016.
 */
import React from 'react';
 class Content extends React.Component{

     componentWillMount(){
         console.log("Component will mount")
     }

     componentDidMount(){
         console.log('Component mounted')
     }

     componentWillReceiveProps(newProps){
        console.log('console will receive update');
     }

     shouldComponentUpdate(newprops,newState){
        return true;
     }

     componentWillUpdate(newProps,newState){
         console.log('Component will update')
     }

     componentDidUpdate(prevProps,newState){
         console.log('component updated')
     }

     componentWillUnmount(){
         console.log('Component will Unmount')
     }

     render(){
         return(
             <div>
                 <h3>{this.props.myNumber}</h3>
             </div>
         )
     }
 }

 export default Content;