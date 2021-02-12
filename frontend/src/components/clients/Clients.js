import React, {useState} from "react";
import {Container, Row, Col, Navbar } from "react-bootstrap";
import { withRouter } from "react-router";
import Sidebar from "../sidebar/Sidebar.js";
import DataTable from "./ClientList";
import SweetAlert from "react-bootstrap-sweetalert";
import '../../styles/clients.css';

const ClientList = props => {
    const [alert, setAlert] = useState(null);

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
                            <Navbar.Brand href="#home">Clients</Navbar.Brand>
                        </Navbar>
                        <DataTable handleAlert={(cid)=>setAlert(<SweetAlert
                            warning
                            showCancel
                            confirmBtnText="Yes, delete it!"
                            confirmBtnBsStyle="danger"
                            title="Are you sure?"
                            onConfirm={()=>setAlert(null)}
                            onCancel={()=>setAlert(null)}
                            focusCancelBtn
                        >
                            You are about to delete #{cid}
                        </SweetAlert>)}/>
                        
                    </Col> 
                </Row>

            </Container>
        </>
        );
  };
  const Clients = withRouter(ClientList);
  export default Clients