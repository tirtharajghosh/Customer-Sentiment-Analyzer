import React, { useState, useEffect } from "react";
import {Container, Row, Col, Navbar, Image, Table } from "react-bootstrap";
import { withRouter } from "react-router";
import Sidebar from "../sidebar/Sidebar.js";
import GaugeChart from "../charts/gauge_chart";
import '../../styles/clients.css';

const axios = require('axios');

const FeedbackData = props => {
    const [feedbackInfo, setFeedInfo] = useState({loading: true});
    const [clientInfo, setClientInfo] = useState({loading: true});
    const [productInfo, setProductInfo] = useState({loading: true});

    const getClientData = async (cid) => {
        try {
            const response = await axios.get('/client/'+cid);
            setClientInfo(Object.assign({loading: false} , response.data));
        } catch (error) {
            console.error(error);
        }
    }

    const getProductData = async (pid) => {
        try {
            const response = await axios.get('/product/'+pid);
            setProductInfo(Object.assign({loading: false} , response.data));
        } catch (error) {
            console.error(error);
        }
    }

    const getFeedbackData = async () => {
        try {
            const response = await axios.get('/feedback/'+props.match.params.id);
            getClientData(response.data.cid);
            getProductData(response.data.pid);
            setFeedInfo(Object.assign({loading: false} , response.data));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getFeedbackData();
        document.title = "Feedback #"+props.match.params.id+" | Inframind";
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
                            <Navbar.Brand href="#home">Feedback #{props.match.params.id}</Navbar.Brand>
                        </Navbar>
                        <Container>
                            <Row>
                                <Col md={3}>
                                    <Image src={clientInfo.loading===true?"":clientInfo.basic.image} style={{maxHeight: '200px'}} thumbnail/>
                                </Col>
                                <Col md={3}>
                                    <b>{clientInfo.loading===true?"":clientInfo.basic.name}</b><br/>
                                    <i className="fa fa-envelope"></i> Mail: {clientInfo.loading===true?"":clientInfo.basic.email}<br/>
                                    <i className="fa fa-phone"></i> Phone: {clientInfo.loading===true?"":clientInfo.basic.phone}<br/>
                                    <i className="fa fa-home"></i> City: {clientInfo.loading===true?"":clientInfo.basic.city+", "+clientInfo.basic.state}<br/>
                                    <i className="fas fa-smile-wink"></i> CSAT Index: {clientInfo.loading===true?"":clientInfo.basic.csat}  <br/>
                                    <i className="fas fa-chart-line"></i> Purchase Activity: <font style={clientInfo.loading===true?{}:(clientInfo.purchaseCount>24)?{color: 'green'}:(clientInfo.purchaseCount>12)?{color: 'orange'}:{color: 'red'}} >{clientInfo.loading===true?"":(clientInfo.purchaseCount>24)?"High":(clientInfo.purchaseCount>12)?"Normal":"Low"} <i className="fas fa-square"></i></font><br/>
                                    <i className="fa fa-star"></i> Priority: <font style={clientInfo.loading===true?{}:(clientInfo.purchaseCount>24 && clientInfo.totalRevenue>60000)?{color: 'green'}:(clientInfo.purchaseCount>12 || clientInfo.totalRevenue>30000)?{color: 'orange'}:{color: 'red'}} >{clientInfo.loading===true?"":(clientInfo.purchaseCount>24 && clientInfo.totalRevenue>60000)?"High":(clientInfo.purchaseCount>12 && clientInfo.totalRevenue>30000)?"Normal":"Low"} <i className="fas fa-square"></i></font><br/>
                                </Col>
                                <Col md={3}>
                                <Image src={productInfo.loading===true?"":productInfo.basic.image} style={{maxHeight: '200px'}} thumbnail/>
                                </Col>
                                <Col md={3}>
                                    <b>{productInfo.loading===true?"":productInfo.basic.name}</b><br/>
                                    <i className="fa fa-money"></i> Price: {productInfo.loading===true?"":"Rs. "+productInfo.basic.price+".00"}<br/>
                                    <i className="fa fa-bars"></i> Quantity: {productInfo.loading===true?"":productInfo.basic.quantity}<br/>
                                    <i className="fa fa-twitter"></i> Twitter Handle: {productInfo.loading===true?"":<a style={{color: "#0CACEE"}} rel="noreferrer" href={"https://twitter.com/hashtag/"+productInfo.basic.hashtag} target="_blank">{"#"+productInfo.basic.hashtag}</a>}<br/>
                                    <i className="fas fa-smile-wink"></i> CSAT Index: {productInfo.loading===true?"":productInfo.basic.csat}  <br/>
                                    <i className="fas fa-chart-line"></i> Purchase Activity: <font style={productInfo.loading===true?{}:(productInfo.purchaseCount>24)?{color: 'green'}:(productInfo.purchaseCount>12)?{color: 'orange'}:{color: 'red'}} >{productInfo.loading===true?"":(productInfo.purchaseCount>24)?"High":(productInfo.purchaseCount>12)?"Normal":"Low"} <i className="fas fa-square"></i></font><br/>
                                    
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <b>Feedback Details</b> 
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                            <th>Type</th>
                                            <th>Details</th>
                                            <th>Sentiment</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {feedbackInfo.loading===true?<tr><td></td><td></td><td></td></tr>:
                                            <>
                                            <tr key={1}>
                                                <td style={{textAlign: 'center'}}>Comment</td> 
                                                <td>{feedbackInfo.comment.length > 50? feedbackInfo.comment.substr(0, 49)+"...":feedbackInfo.comment}</td>
                                                <td>{feedbackInfo.comment_csat}</td>
                                            </tr>
                                            <tr key={2}>
                                                <td style={{textAlign: 'center'}}>Chat</td> 
                                                <td>{feedbackInfo.chat_text.length > 50? feedbackInfo.chat_text.substr(0, 49)+"...":feedbackInfo.chat_text}</td>
                                                <td>{feedbackInfo.chat_csat}</td>
                                            </tr>
                                            <tr key={3}>
                                                <td style={{textAlign: 'center'}}>Image</td> 
                                                <td>{feedbackInfo.image?<a style={{color: "blue"}} rel="noreferrer" href={feedbackInfo.image} target="_blank" >Open <i class="fa fa-external-link-alt"></i></a>:null}</td>
                                                <td>{feedbackInfo.image_csat}</td>
                                            </tr>
                                            <tr key={4}>
                                                <td style={{textAlign: 'center'}}>Audio</td> 
                                                <td>{feedbackInfo.audio?<a style={{color: "blue"}} rel="noreferrer" href={feedbackInfo.audio} target="_blank" >Open <i class="fa fa-external-link-alt"></i></a>:null}</td>
                                                <td>{feedbackInfo.audio_csat}</td>
                                            </tr>
                                            <tr key={1}>
                                                <td style={{textAlign: 'center'}}>Video</td> 
                                                <td>{feedbackInfo.video?<a style={{color: "blue"}} rel="noreferrer" href={feedbackInfo.video} target="_blank" >Open <i class="fa fa-external-link-alt"></i></a>:null}</td>
                                                <td>{feedbackInfo.video_csat}</td>
                                            </tr>
                                            </>
                                            }
                                        </tbody>
                                    </Table>
                                </Col>
                                <Col md={6}>
                                    <b>Overall Customer Satisfaction</b><br/>
                                    <b style={{fontSize: '50px'}}>{feedbackInfo.csat}</b>
                                    <GaugeChart value={feedbackInfo.csat}/>
                                </Col>
                            </Row>
                        </Container>
                    </Col> 
                </Row>

            </Container>
        </>
        );
  };
  
  const FeedbackSingle = withRouter(FeedbackData);
  export default FeedbackSingle;