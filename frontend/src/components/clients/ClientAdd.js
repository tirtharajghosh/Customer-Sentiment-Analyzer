import React, {useState} from "react";
import {Container, Row, Col, Navbar, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import Sidebar from "../sidebar/Sidebar.js";
import SweetAlert from "react-bootstrap-sweetalert";
import '../../styles/clients.css';

const axios = require('axios');

const ClientForm = props => {
    const [alert, setAlert] = useState(false);
    const [formData, setFormData] = useState({name: "", image: "", phone: "", email: "", addr1: "", addr2: "", city: "", state: "", pin: "", country: "India" });

    const submitFormData = async () => {
        try {
            const response = await axios.post('/client', formData);
            if(response.data.success == true){
                setAlert(true);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setFormData({name: "", image: "", phone: "", email: "", addr1: "", addr2: "", city: "", state: "", pin: "", country: "India" });
        }
    }

    return (
        <>
        {alert?<SweetAlert
  success
  title="Success!"
  onConfirm={()=>setAlert(false)}
  onCancel={()=>setAlert(false)}
  timeout={5000}
>
  New customer Added Successfully!
</SweetAlert>:""}
         <Container fluid>
                <Row>
                    <Col md={2} id="sidebar-wrapper">      
                      <Sidebar />
                    </Col>
                    <Col md={10} id="page-content-wrapper">
                        <Navbar bg="light" variant="light">
                            <Navbar.Brand href="#home">Create new client</Navbar.Brand>
                        </Navbar>
                        <br/>
                        <Container>
                            <Form>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Image URL</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Image URL" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control type="text" placeholder="Enter phone" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Group controlId="formGridAddress1">
                                    <Form.Label>Address 1</Form.Label>
                                    <Form.Control placeholder="1234 Main St" value={formData.addr1} onChange={e => setFormData({ ...formData, addr1: e.target.value })} />
                                </Form.Group>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridAddress2">
                                        <Form.Label>Address 2</Form.Label>
                                        <Form.Control placeholder="Apartment, studio, or floor" value={formData.addr2} onChange={e => setFormData({ ...formData, addr2: e.target.value })} />
                                    </Form.Group>
                                    <Form.Group controlId="formGridCity">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>State</Form.Label>
                                    <Form.Control as="select" defaultValue={formData.state} onChange={e => setFormData({ ...formData, state: e.target.value })} >
                                        <option>Choose...</option>
                                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                                        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                        <option value="Assam">Assam</option>
                                        <option value="Bihar">Bihar</option>
                                        <option value="Chandigarh">Chandigarh</option>
                                        <option value="Chhattisgarh">Chhattisgarh</option>
                                        <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                                        <option value="Daman and Diu">Daman and Diu</option>
                                        <option value="Delhi">Delhi</option>
                                        <option value="Lakshadweep">Lakshadweep</option>
                                        <option value="Puducherry">Puducherry</option>
                                        <option value="Goa">Goa</option>
                                        <option value="Gujarat">Gujarat</option>
                                        <option value="Haryana">Haryana</option>
                                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                                        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                        <option value="Jharkhand">Jharkhand</option>
                                        <option value="Karnataka">Karnataka</option>
                                        <option value="Kerala">Kerala</option>
                                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                                        <option value="Maharashtra">Maharashtra</option>
                                        <option value="Manipur">Manipur</option>
                                        <option value="Meghalaya">Meghalaya</option>
                                        <option value="Mizoram">Mizoram</option>
                                        <option value="Nagaland">Nagaland</option>
                                        <option value="Odisha">Odisha</option>
                                        <option value="Punjab">Punjab</option>
                                        <option value="Rajasthan">Rajasthan</option>
                                        <option value="Sikkim">Sikkim</option>
                                        <option value="Tamil Nadu">Tamil Nadu</option>
                                        <option value="Telangana">Telangana</option>
                                        <option value="Tripura">Tripura</option>
                                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                                        <option value="Uttarakhand">Uttarakhand</option>
                                        <option value="West Bengal">West Bengal</option>
                                    </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>PIN</Form.Label>
                                    <Form.Control value={formData.pin} onChange={e => setFormData({ ...formData, pin: e.target.value })} />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control value="India" readOnly/>
                                    </Form.Group>
                                </Form.Row>
                                <Button variant="primary" onClick={submitFormData}>
                                    Create Client
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