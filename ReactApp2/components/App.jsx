import React from 'react';
import Sidebar from './SideBar.jsx';
import $ from "jquery";
import ReactDom from "react-dom";
import Content from './Content.js'
import TableRow from './tableRow.js'
import Header from './header.js';
import TableContent from './table/TableContent.js';


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            number: 0,
            inputText: ''
        }

        this.updateNumber = this.updateNumber.bind(this);
        this.updateInputText = this.updateInputText.bind(this);
    }

    componentDidMount() {
        $.ajax({
            url: "http://localhost:8080/article",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic UTRFb252VGd1elJWQkdPWk9OVUVZQzdsbDlPOEx3c0w6'
            },
        }).then(function (data) {

            this.setState({data: data});
        }.bind(this));
    }

    render() {
        var divStyle = {
            position: "absolute",
            width: "70%",
            height: "100%",
            zIndex: 15,
            top: "10px",
            left: "15%",
            background: "#033c07"

        }
        var mainDivStyle = {
            position: "absolute",
            background: '#eee',
            width: "98%",
            height : "100%",
            top: "0px",
            left: "1%",
        }
        return (
            <div style={mainDivStyle}>
                <div style={divStyle}>
                    <Header inputText={this.state.inputText} updateInputText={this.updateInputText}></Header>
                    <table>
                        <tbody >
                        {this.state.data.map((person, i)=> <TableRow key={i} data={person}/>)}
                        </tbody>
                    </table>
                    <div>
                    </div>
                </div>
                <div>
                    <ul>
                        <li>Home</li>
                        <li>About</li>
                        <li>Contact</li>
                    </ul>
                    {this.props.children}
                </div>
            </div>
        );
    }

    updateInputText(e) {
        this.setState({
            inputText: e.target.value
        });
    }

    updateNumber() {
        this.setState({number: this.state.number + 1})
        this.state.number = this.state.number + 1;
    }
}
export default App;