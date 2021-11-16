import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Navbar, NavbarBrand } from 'react-bootstrap';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: 'Don Strong',
      headerLinks: [
        {
          title: 'Home', 
          path: '/',
        },
        {
          title: 'About', 
          path: '/about',
        },
        {
          title: 'Contact', 
          path: '/contact',
        }
      ],
      home: {
        title: 'Be Relentless',
        subTitle: 'Projects that make a difference',
        blurb: 'Checkout these projects',
      },
      about: {
        title: 'About Me',
      },
      contact: {
        title: 'Let\'s Talk',
      },
    }
  }

  render() {

    return (

      <Router>
        <Container className = "p-0" fluid = {true}>

          <Navbar className="border-bottom">
            <Navbar.Brand>Don Strong</Navbar.Brand>
            
          </Navbar>

        </Container>
      </Router>

    );

  }


}

export default App;
