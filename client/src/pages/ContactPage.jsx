import React, {Component} from 'react';
import Hero from '../components/Hero';
import Content from '../components/Content';
import Button from 'react-bootstrap/Button';
import ContactForm from '../components/ContactForm';

function ContactPage(props) {
    return(
        <div>
            <Hero title={props.title}/>
            <ContactForm/>
        </div>
    );
}

export default ContactPage;