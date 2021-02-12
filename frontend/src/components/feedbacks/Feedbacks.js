import React, {useState, useEffect} from "react";
import {Container, Row, Col, Navbar } from "react-bootstrap";
import { withRouter } from "react-router";
import Sidebar from "../sidebar/Sidebar.js";
import DataTable from "./FeedbackList";
import SweetAlert from "react-bootstrap-sweetalert";
import '../../styles/clients.css';

const FeedList = props => {
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        document.title = "Feedbacks | Inframind"
    }, []);

    return (
        <>
        {alert}
         <Container fluid>
                <Row>
                    <Col md={2} id="sidebar-wrapper">      
                      <Sidebar />
                    </Col>
                    <Col md={10} id="page-content-wrapper">
                        <Navbar bg="light" variant="light">
                            <Navbar.Brand href="#home">Feedbacks</Navbar.Brand>
                        </Navbar>
                        <DataTable handleAlert={(fid)=>setAlert(<SweetAlert
                            warning
                            showCancel
                            confirmBtnText="Yes, delete it!"
                            confirmBtnBsStyle="danger"
                            title="Are you sure?"
                            onConfirm={()=>setAlert(null)}
                            onCancel={()=>setAlert(null)}
                            focusCancelBtn
                        >
                            You are about to delete #{fid}
                        </SweetAlert>)}/>
                
                    </Col> 
                </Row>

            </Container>
        </>
        );
  };
  const Feedbacks = withRouter(FeedList);
  export default Feedbacks