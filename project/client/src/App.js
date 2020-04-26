import React, { Component } from 'react';

import { Navbar, Nav } from "react-bootstrap"
import { Route, BrowserRouter } from 'react-router-dom'
import Home from "./Pages/Home"
import Claim from "./Pages/Claim"
import Create from "./Pages/Create"
import 'bootstrap/dist/css/bootstrap.min.css';
class App extends Component {

  render() {
    return (
      <div>
          <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">EtherWill</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="create">Create Wills</Nav.Link>
      <Nav.Link href="claim">Claim Inheritance</Nav.Link>
    </Nav>
    
  </Navbar>
        <BrowserRouter>
          <Route component={Home} exact path="/" />
          <Route component={Claim} path="/claim" />
          <Route component={Create} path="/create" />
        </BrowserRouter></div>
    )

  }
}


export default App;
