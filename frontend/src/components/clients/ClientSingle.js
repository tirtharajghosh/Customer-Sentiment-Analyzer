import React, { useState, useEffect } from "react";
import {Container, Row, Col, Navbar, ListGroup, Image, Table } from "react-bootstrap";
import { withRouter } from "react-router";
import Sidebar from "../sidebar/Sidebar.js";
import CSATD from "../charts/csat_doughnut";
import CSATL from "../charts/csat_line";
import ACTA from "../charts/activity_area";
import '../../styles/clients.css';

const axios = require('axios');

const ClientData = props => {
    const [clientInfo, setClientInfo] = useState({loading: true});

    const getClientData = async () => {
        try {
            const response = await axios.get('/client/'+props.match.params.id);
            setClientInfo(Object.assign({loading: false} , response.data));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getClientData();
    }, [])
    
    return (
        <>
         <Container fluid>
                <Row>
                    <Col md={2} id="sidebar-wrapper">      
                      <Sidebar />
                    </Col>
                    <Col md={10} id="page-content-wrapper">
                        <Navbar bg="light" variant="light">
                            <Navbar.Brand href="#home">Client #{props.match.params.id}</Navbar.Brand>
                        </Navbar>
                        <Container>
                            <Row>
                                <Col md={3}>
                                    <Image src={clientInfo.loading===true?"":clientInfo.basic.image} style={{maxHeight: '200px'}} thumbnail/>
                                </Col>
                                <Col md={6}>
                                    <b>{clientInfo.loading===true?"":clientInfo.basic.name}</b><br/>
                                    <i className="fa fa-envelope"></i> Mail: {clientInfo.loading===true?"":clientInfo.basic.email}<br/>
                                    <i className="fa fa-phone"></i> Phone: {clientInfo.loading===true?"":clientInfo.basic.phone}<br/>
                                    <i className="fa fa-home"></i> City: {clientInfo.loading===true?"":clientInfo.basic.city+", "+clientInfo.basic.state}<br/>
                                    <i className="fas fa-smile-wink"></i> CSAT Score: {clientInfo.loading===true?"":clientInfo.basic.csat}  <br/>
                                    <i className="fas fa-chart-line"></i> Purchase Activity: <font style={clientInfo.loading===true?{}:(clientInfo.purchaseCount>24)?{color: 'green'}:(clientInfo.purchaseCount>12)?{color: 'orange'}:{color: 'red'}} >{clientInfo.loading===true?"":(clientInfo.purchaseCount>24)?"High":(clientInfo.purchaseCount>12)?"Normal":"Low"} <i className="fas fa-square"></i></font><br/>
                                    <i className="fa fa-star"></i> Priority: <font style={clientInfo.loading===true?{}:(clientInfo.purchaseCount>24 && clientInfo.totalRevenue>60000)?{color: 'green'}:(clientInfo.purchaseCount>12 && clientInfo.totalRevenue>30000)?{color: 'orange'}:{color: 'red'}} >{clientInfo.loading===true?"":(clientInfo.purchaseCount>24 && clientInfo.totalRevenue>60000)?"High":(clientInfo.purchaseCount>12 && clientInfo.totalRevenue>30000)?"Normal":"Low"} <i className="fas fa-square"></i></font><br/>
                                </Col>
                                <Col md={3}>
                                    {clientInfo.loading===true?"":<CSATD data={clientInfo.overall_csat} /> }
                                    <b>Overall Feedbacks</b>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <b>Customer Satisfaction History</b> 
                                    <CSATL data={clientInfo.csatHistoryChartData}/>
                                </Col>
                                <Col md={6}>
                                    <b>Purchase Activity</b>
                                    <ACTA data={clientInfo.purchaseActivityChartData}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <b>Feedback History</b>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                            <th>Image</th>
                                            <th>Product</th>
                                            <th>CSAT</th>
                                            <th>Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {clientInfo.loading===true?<tr><td></td><td></td><td></td><td></td></tr>:clientInfo.feedbackHistory.map((item, i) => {
                                            return [
                                                <tr key={i}>
                                                <td style={{textAlign: 'center'}}><img src={item.image} height="20px" /></td> 
                                                <td>{item.name.length > 70? item.name.substr(0, 69)+"...":item.name}</td>
                                                <td>{item.csat}</td>
                                                <td>{item.created_at}</td>
                                                </tr>
                                            ];
                                        })}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </Container>
                    </Col> 
                </Row>

            </Container>
        </>
        );
  };
  
  const ClientSingle = withRouter(ClientData);
  export default ClientSingle;