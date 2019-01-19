import React from 'react';
import {Link} from 'react-router';
import {Panel,Row,Col} from 'react-bootstrap';

class HomePage extends React.Component{
    render(){
        return(
                <div>
                    <Panel>
                        <Panel.Heading>
                            <Panel.Title>Panel Heading</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            <Row>
                                <Col md={4} className="fa fa-search">
                                    Column1
                                </Col>
                                <Col md={8}>
                                    Column1
                                </Col>
                            </Row>
                        </Panel.Body>
                    </Panel>
                </div>
        );
    }
}

export default HomePage;


