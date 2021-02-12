import React, {useState, useEffect} from "react";
import {Container, Row, Col, Navbar } from "react-bootstrap";
import { withRouter } from "react-router";
import Sidebar from "../sidebar/Sidebar.js";
import DataTable from "./ProductList";
import SweetAlert from "react-bootstrap-sweetalert";
import '../../styles/clients.css';

const ProductList = props => {
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        document.title = "Products | Inframind"
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
                            <Navbar.Brand href="#home">Products</Navbar.Brand>
                        </Navbar>
                        <DataTable handleAlert={(pid)=>setAlert(<SweetAlert
                            warning
                            showCancel
                            confirmBtnText="Yes, delete it!"
                            confirmBtnBsStyle="danger"
                            title="Are you sure?"
                            onConfirm={()=>setAlert(null)}
                            onCancel={()=>setAlert(null)}
                            focusCancelBtn
                        >
                            You are about to delete #{pid}
                        </SweetAlert>)}/>
                        
                    </Col> 
                </Row>

            </Container>
        </>
        );
  };
  const Products = withRouter(ProductList);
  export default Products