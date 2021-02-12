import React, { useState, useEffect} from "react";
import axios from 'axios';
import {Card, CardDeck } from "react-bootstrap";
import {Container, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router";
import Sidebar from "../sidebar/Sidebar.js";
import CSATD from "../charts/csat_doughnut";
import '../../styles/dashboard.css';

const About = props => {
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
        document.title = "About";
    }, [])

    return (
        <>
         <Container fluid>
                <Row>
                    <Col xs={2} id="sidebar-wrapper">      
                      <Sidebar />
                    </Col>
                    <Col  xs={10} id="page-content-wrapper"  style={{textAlign: 'center'}}>
                        <h1>Enterprise AI</h1>
                        A Project developed for TCS Inframind Competition<br/>
                        <div style={{fontSize: '50px'}}>
                            <i style={{color: '#FF0000'}} class="fa fa-youtube" ></i>&nbsp;
                            <i style={{color: '#4078c0'}} class="fa fa-github" ></i>&nbsp;
                            <i style={{color: '#FE001A'}} class="fa fa-file-pdf-o" ></i> 
                        </div><br/>
                        <div style={{border: '1px solid #ccc', borderRadius: '25px', padding: '20px', marginLeft: '350px', marginRight: '350px' }}>
                        Languages &amp; tools used<br/>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png" alt="React" width="60px" />
                        <img src="https://banner2.cleanpng.com/20180809/hvf/kisspng-flask-by-example-web-framework-python-bottle-sebastian-estenssoro-5b6c0aa33b3b57.9170119715338072672426.jpg" alt="Flask" width="60px" />
                        <img src="https://pbs.twimg.com/profile_images/1255113654049128448/J5Yt92WW_400x400.png" alt="MySQL" width="60px" />
                        </div><br/>
                        Designed &amp; developed by<br/> <b>Tirtharaj Ghosh</b>
                        <div style={{fontSize: '20px'}}>
                            <i style={{color: '#4267B2'}} class="fa fa-facebook" ></i>&nbsp;
                            <i style={{color: '#00acee'}} class="fa fa-twitter" ></i>&nbsp;
                            <i style={{color: '#0e76a8'}} class="fa fa-linkedin" ></i>&nbsp;
                            <i style={{color: '#F48024'}} class="fa fa-stack-overflow" ></i>&nbsp;
                            <i style={{color: '#4078c0'}} class="fa fa-github" ></i>  
                        </div>
                    </Col> 
                </Row>

            </Container>
        </>
        );
  };
  const AboutUs = withRouter(About);
  export default AboutUs