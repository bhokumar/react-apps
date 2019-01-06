/**
 * Created by BHOOPENDRA on 12/25/2016.
 */
import React from 'react';

class Header extends React.Component {


    changeText(event) {
        this.setState({
            inputText: event.target.value
        })
    }

    searchArticle() {

    }

    render() {
        var headerStyle = {
            textAlign: "center"
        }

        return (
            <div style={headerStyle}>
                <h1>Currency Evaluator</h1>
                <input type="text" placeholder="Enter a value to search" value={this.props.inputText} onChange={this.props.updateInputText}/>
                <br/>
                <button onClick={this.searchArticle()}>Search</button>
            </div>
        );
    }
}
export default Header;
