/**
 * Created by BHOOPENDRA on 12/25/2016.
 */
import React from 'react';

class TableRow extends React.Component {
    render() {
        var letterStyle = {
            padding: 10,
            borderColor: '#ffffff',
            borderWidth: '20px',
            borderStyle : "block",
            backgroundColor: "cadetblue",
            color: "#333",
            width: "214%",
            display: "block",
            fontFamily: "monospace",
            fontSize: 20,
            textAlign: "center"
        };
        return (
            <tr style={letterStyle}>
                <td>{this.props.data.courseID}</td>
                <td>{this.props.data.articleID}</td>
                <td>{this.props.data.articleName}</td>
            </tr>
        );
    }
}
export default TableRow;
