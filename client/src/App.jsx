import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import { Container, Navbar, NavbarBrand, Nav} from 'react-bootstrap';
import './App.css';


import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

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
        text: 'Checkout these projects',
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

          <Navbar className="border-bottom p-3" bg="transparent" expand="lg">
            <Navbar.Brand>
              <h5 className="fw-bold">Don Strong</h5>
              </Navbar.Brand>
          
            <Navbar.Toggle className = "border-0" aria-controls="navbar-toggle" />
            <Navbar.Collapse id = 'navbar-toggle'>

              <Nav className = "ms-auto">
                <Link className='nav-link fw-light' to='/'>Home</Link>
                <Link className='nav-link fw-light' to='/about'>About</Link>
                <Link className='nav-link fw-light' to='/contact'>Contact</Link>

              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Routes>
          <Route path="/" element={<HomePage title={this.state.home.title} subTitle={this.state.home.subTitle} text={this.state.home.text} />} />
          <Route path="/about" element={<AboutPage title={this.state.about.title} />} />
          <Route path="/contact" element={<ContactPage title={this.state.contact.title} />} />
          </Routes>

          <Footer />

        </Container>
      </Router>

    );

  }
}

export default App;
