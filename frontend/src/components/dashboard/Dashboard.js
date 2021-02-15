import React, { useState, useEffect} from "react";
import axios from 'axios';
import {Card, CardDeck } from "react-bootstrap";
import {Container, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router";
import Sidebar from "../sidebar/Sidebar.js";
import CSATD from "../charts/csat_doughnut";
import '../../styles/dashboard.css';

const Dash = props => {
    const [info, setInfo] = useState({loading: true});

    const getDashboardData = async () => {
        try {
            const response = await axios.get('/dashboard');
            setInfo(Object.assign({loading: false} , response.data));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getDashboardData();
    }, [])

    return (
        <>
         <Container fluid>
                <Row>
                    <Col xs={2} id="sidebar-wrapper">      
                      <Sidebar />
                    </Col>
                    <Col  xs={10} id="page-content-wrapper">
                    <CardDeck>
                        <Card
                        bg="info"
                        key={1}
                        text="light"
                        style={{ width: '18rem' }}
                        className="mb-2">
                            <Card.Header>Total Customers</Card.Header>
                            <Card.Body>
                                <Card.Title> {info.loading===true?"":info.count_customer } </Card.Title>
                            </Card.Body>
                        </Card>
                        <Card
                        bg="success"
                        key={2}
                        text="light"
                        style={{ width: '18rem' }}
                        className="mb-2">
                            <Card.Header>Total Products</Card.Header>
                            <Card.Body>
                                <Card.Title> {info.loading===true?"":info.count_product } </Card.Title>
                            </Card.Body>
                        </Card>
                        <Card
                        bg="primary"
                        key={3}
                        text="light"
                        style={{ width: '18rem' }}
                        className="mb-2">
                            <Card.Header>Total Feedbacks</Card.Header>
                            <Card.Body>
                                <Card.Title> {info.loading===true?"":info.count_feedback } </Card.Title>
                            </Card.Body>
                        </Card>
                        </CardDeck>
                        <div style={{float: 'right'}}>
                            {info.loading===true?"":<CSATD data={info.pi} /> }
                            <b>Overall Customers Satisfaction</b>
                        </div>
                        <div style={{padding: '5px 0 5px 5px'}}>
                            <b>Labels</b><br/>
                            <i style={{color: '#E5470B'}} className="fas fa-square"></i> CSAT Index 0-1 : Very Negative<br/>
                            <i style={{color: '#E5990B'}} className="fas fa-square"></i> CSAT Index 1-2 : Negative<br/>
                            <i style={{color: '#E5DB0B'}} className="fas fa-square"></i> CSAT Index 2-3 : Neutral<br/>
                            <i style={{color: '#B0E50B'}} className="fas fa-square"></i> CSAT Index 3-4 : Positive<br/>
                            <i style={{color: '#65E50B'}} className="fas fa-square"></i> CSAT Index 4-5 : Very Positive<br/> 
                        </div>
                        
                    </Col> 
                </Row>

            </Container>
        </>
        );
  };
  const Dashboard = withRouter(Dash);
  export default Dashboard