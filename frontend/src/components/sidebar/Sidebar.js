import React from "react";
import {Nav, Image} from "react-bootstrap";
import { withRouter } from "react-router";
import '../../styles/sidebar.css';

const Side = props => {
   

    return (
        <>
    
            <Nav className="col-md-2 d-none d-md-block bg-dark sidebar"
            activeKey="/home"
            >
                <div className="sidebar-sticky">
                    <Image src="https://pbs.twimg.com/profile_images/1319550226575716352/dPLzK52V_400x400.jpg" roundedCircle fluid />
                    <b>Inframind</b>
                </div>
                <Nav.Item>
                    <Nav.Link style={{color: 'white'}} href="/dashboard">Dashboard</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link style={{color: 'white'}} href="/clients">Clients</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link style={{color: 'white'}} href="/products">Products</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link style={{color: 'white'}} href="/feedbacks">Feedbacks</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link style={{color: 'white'}} href="/about">About</Nav.Link>
                </Nav.Item>
            </Nav>
          
        </>
        );
  };
  const Sidebar = withRouter(Side);
  export default Sidebar