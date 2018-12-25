import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
            default:
                break;
        }
    }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.counter} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={this.props.onAddFiveToCounter}  />
                <CounterControl label="Subtract 5" clicked={this.props.onSubtractFiveToCounter}  />
                <hr/>
                <button onClick = { () => this.props.onStoreResult(this.props.counter)}>Store Results</button>
                <ul>
                    {this.props.results.map(result => (
                        <li key = {result.id} onClick = {() => this.props.onDeleteResult(result.id)}>{result.value}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        counter: state.counter.counter,
        results: state.result.results
    };
}

const mapDispachToProps = dispatch => {
    return { 
        onIncrementCounter: () => dispatch({ type: actionTypes.INCREMENT }),
        onDecrementCounter: () => dispatch({ type: actionTypes.DECREMENT }),
        onAddFiveToCounter: () => dispatch({ type: actionTypes.ADD, payload: 5}),
        onSubtractFiveToCounter: () => dispatch({ type: actionTypes.SUBTRACT, payload: 5}),
        onStoreResult: (result) => dispatch({ type: actionTypes.STORE_RESULT, payload: result}),
        onDeleteResult: (id) => dispatch({ type: actionTypes.DELETE_RESULT, payload: id})
    };
}

export default connect(mapStateToProps, mapDispachToProps)(Counter);