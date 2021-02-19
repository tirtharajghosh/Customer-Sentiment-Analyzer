import React, {useState, useEffect} from "react";
import Select from "react-select";
import {Container, Row, Col, Navbar, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import Sidebar from "../sidebar/Sidebar.js";
import SweetAlert from "react-bootstrap-sweetalert";
import '../../styles/clients.css';

const axios = require('axios');

const ClientForm = props => {
    const [alert, setAlert] = useState(false);
    const [formData, setFormData] = useState({customer: "", product: "", comment: "", chat: "", imageLink: "", audioLink: "", videoLink: ""});

    const [customerSelect, setCustomerSelect] = useState([]);
    const [productSelect, setProductSelect] = useState([]);

    const getCustomerSelect = async () => {
        try {
            const response = await axios.get('/clientselect');
            if(response.data.success === true){
                setCustomerSelect(response.data.options);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const getProductSelect = async () => {
        try {
            const response = await axios.get('/productselect');
            if(response.data.success === true){
                setProductSelect(response.data.options);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const submitFormData = async () => {
        try {
            const response = await axios.post('/feedback', formData);
            if(response.data.success === true){
                setAlert(true);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setFormData({customer: "", product: "", comment: "", chat: "", imageLink: "", audioLink: "", videoLink: ""});

        }
    }

    useEffect(() => {
        document.title = "Create Feedback | Inframind";
        getCustomerSelect();
        getProductSelect();
    }, []);

    return (
        <>
        {alert?<SweetAlert
  success
  title="Success!"
  onConfirm={()=>setAlert(false)}
  onCancel={()=>setAlert(false)}
  timeout={5000}
>
  New Feedback Added Successfully!
</SweetAlert>:""}
         <Container fluid>
                <Row>
                    <Col md={2} id="sidebar-wrapper">      
                      <Sidebar />
                    </Col>
                    <Col md={10} id="page-content-wrapper">
                        <Navbar bg="light" variant="light">
                            <Navbar.Brand href="#home">Create new Feedback</Navbar.Brand>
                        </Navbar>
                        <br/>
                        <Container>
                            <Form>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Customer</Form.Label>
                                    <Select isSearchable={true} noOptionsMessage="Loading..." defaultValue={formData.customer} options={customerSelect} onChange={(e) => setFormData({ ...formData, customer: e.value })} />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Product</Form.Label>
                                    <Select isSearchable={true} noOptionsMessage="Loading..." defaultValue={formData.product} options={productSelect} onChange={(e) => setFormData({ ...formData, product: e.value })} />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Comment Text</Form.Label>
                                        <Form.Control as="textarea" rows={3} value={formData.comment} onChange={e => setFormData({ ...formData, comment: e.target.value })} />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Chat Text</Form.Label>
                                        <Form.Control as="textarea" rows={3} value={formData.chat} onChange={e => setFormData({ ...formData, chat: e.target.value })} />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridAddress1">
                                        <Form.Label>Image Link</Form.Label>
                                        <Form.Control placeholder="" value={formData.imageLink} onChange={e => setFormData({ ...formData, imageLink: e.target.value })} />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridAddress2">
                                        <Form.Label>Video Link</Form.Label>
                                        <Form.Control placeholder="" value={formData.videoLink} onChange={e => setFormData({ ...formData, videoLink: e.target.value })} />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Label>Audio Link</Form.Label>
                                        <Form.Control value={formData.audioLink} onChange={e => setFormData({ ...formData, audioLink: e.target.value })} />
                                    </Form.Group>
                                </Form.Row>

                                <Button variant="primary" onClick={submitFormData}>
                                    Create Feedback
                                </Button>
                            </Form>
                        </Container>
                    </Col> 
                </Row>

            </Container>
        </>
        );
  };
  const ClientAdd = withRouter(ClientForm);
  export default ClientAdd;