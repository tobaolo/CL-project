import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

// Importing a few elements from react-bootstrap for design aesthetics
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// Importing a few elements from react-router-dom to handle routing in our application
import { BrowserRouter, Link, Redirect, Route, Switch, withRouter } from 'react-router-dom';

// Import our created components
import Home from './Home';
import Article from './Article';
import Country from './Country';


function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand as={Link} to="/">
              Child Labor Project
            </Navbar.Brand>
            <Nav className="mr-auto"></Nav>
          </Navbar>
        </header>

        <Container fluid className="mt-3">
          <Switch>
            <Redirect exact from="/" to="home" />
            <Route exact path="/home" component={Home} />
            <Route exact path="/country" component={Country} />
            <Route exact path="/article" component={Article} />
          </Switch>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
