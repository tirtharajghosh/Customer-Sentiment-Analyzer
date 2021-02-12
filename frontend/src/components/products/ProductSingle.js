import React, { useState, useEffect } from "react";
import {Container, Row, Col, Navbar, ListGroup, Image, Table } from "react-bootstrap";
import { withRouter } from "react-router";
import Sidebar from "../sidebar/Sidebar.js";
import CSATD from "../charts/csat_doughnut";
import CSATL from "../charts/csat_line";
import ACTA from "../charts/activity_area";
import '../../styles/clients.css';

const axios = require('axios');

const ProductData = props => {
    const [productInfo, setProductInfo] = useState({loading: true});

    const getProductData = async () => {
        try {
            const response = await axios.get('/product/'+props.match.params.id);
            setProductInfo(Object.assign({loading: false} , response.data));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getProductData();
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
                            <Navbar.Brand href="#home">Product #{props.match.params.id}</Navbar.Brand>
                        </Navbar>
                        <Container>
                            <Row>
                                <Col md={3}>
                                    <Image src={productInfo.loading===true?"":productInfo.basic.image} style={{maxHeight: '200px'}} thumbnail/>
                                </Col>
                                <Col md={6}>
                                    <b>{productInfo.loading===true?"":productInfo.basic.name}</b><br/>
                                    <i className="fa fa-money"></i> Price: {productInfo.loading===true?"":"Rs. "+productInfo.basic.price+".00"}<br/>
                                    <i className="fa fa-bars"></i> Quantity: {productInfo.loading===true?"":productInfo.basic.quantity}<br/>
                                    <i className="fa fa-twitter"></i> Twitter Handle: {productInfo.loading===true?"":<a style={{color: "#0CACEE"}} href={"https://twitter.com/hashtag/"+productInfo.basic.hashtag} target="_blank">{"#"+productInfo.basic.hashtag}</a>}<br/>
                                    <i className="fas fa-smile-wink"></i> CSAT Score: {productInfo.loading===true?"":productInfo.basic.csat}  <br/>
                                    <i className="fas fa-chart-line"></i> Purchase Activity: <font style={productInfo.loading===true?{}:(productInfo.purchaseCount>24)?{color: 'green'}:(productInfo.purchaseCount>12)?{color: 'orange'}:{color: 'red'}} >{productInfo.loading===true?"":(productInfo.purchaseCount>24)?"High":(productInfo.purchaseCount>12)?"Normal":"Low"} <i className="fas fa-square"></i></font><br/>
                                    {/* <i className="fa fa-star"></i> Priority: <font style={productInfo.loading===true?{}:(productInfo.purchaseCount>24 && productInfo.totalRevenue>60000)?{color: 'green'}:(productInfo.purchaseCount>12 || productInfo.totalRevenue>30000)?{color: 'orange'}:{color: 'red'}} >{productInfo.loading===true?"":(productInfo.purchaseCount>24 && productInfo.totalRevenue>60000)?"High":(productInfo.purchaseCount>12 || productInfo.totalRevenue>30000)?"Normal":"Low"} <i className="fas fa-square"></i></font><br/> */}
                                </Col>
                                <Col md={3}>
                                    {productInfo.loading===true?"":<CSATD data={productInfo.overall_csat} /> }
                                    <b>Overall Feedbacks</b>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <b>Customer Satisfaction History</b> 
                                    <CSATL data={productInfo.csatHistoryChartData}/>
                                </Col>
                                <Col md={6}>
                                    <b>Purchase Activity</b>
                                    <ACTA data={productInfo.purchaseActivityChartData}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={9}>
                                    <b>Feedback History</b>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                            <th>#</th>
                                            <th>Product</th>
                                            <th>CSAT</th>
                                            <th>Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {productInfo.loading===true?<tr><td></td><td></td><td></td><td></td></tr>:productInfo.feedbackHistory.map((item, i) => {
                                            return [
                                                <tr key={i}>
                                                <td style={{textAlign: 'center'}}>{i+1}</td> 
                                                <td>{item.name.length > 50? item.name.substr(0, 49)+"...":item.name}</td>
                                                <td>{item.csat}</td>
                                                <td>{item.created_at}</td>
                                                </tr>
                                            ];
                                        })}
                                        </tbody>
                                    </Table>
                                </Col>
                                <Col md={3}>
                                    <b>Twitter Feedback</b>
                                    {productInfo.loading===true?"":<CSATD data={[productInfo.twitterAnalysis.positive,0,productInfo.twitterAnalysis.neutral,0,productInfo.twitterAnalysis.negative]} /> }
                                </Col>
                            </Row>
                        </Container>
                    </Col> 
                </Row>

            </Container>
        </>
        );
  };
  
  const ProductSingle = withRouter(ProductData);
  export default ProductSingle;