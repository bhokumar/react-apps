import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as counterActionCreators from '../../store/actions/counter';

import * as resultsActionCreators from '../../store/actions/results';

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
        onIncrementCounter: () => dispatch(counterActionCreators.increment()),
        onDecrementCounter: () => dispatch(counterActionCreators.decrement()),
        onAddFiveToCounter: () => dispatch(counterActionCreators.add(5)),
        onSubtractFiveToCounter: () => dispatch(counterActionCreators.subtract(5)),
        onStoreResult: (result) => dispatch(resultsActionCreators.storeResult(result)),
        onDeleteResult: (id) => dispatch(resultsActionCreators.deleteResult(id))
    };
}

export default connect(mapStateToProps, mapDispachToProps)(Counter);