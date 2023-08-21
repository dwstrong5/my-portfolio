import React, {Component} from 'react';
import Hero from './Hero';
import Content from './Content';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import axios from 'axios';

class ContactForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            message: '',
            disabled: '',
            emailSent: null,
        }
    }


    handleChange = (event) => {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState( {
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
            disabled:true,
        });

        axios.post('http://localhost:3030/api/email', this.state)
        .then(res => {

            if(res.data.success) {

                this.setState({
                    disabled: false,
                    emailSent: true,
                });
            }
            else {
                this.setState({
                    disabled: false,
                    emailSent: false,
                });
            }  
        })

        .catch(err => {
            this.setState({
                disabled: false,
                emailSent: false
            });
        })
    }

    render() {
        return(
            <div>
                <Content>
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label htmlFor="full-name">Full Name</Form.Label>
                        <Form.Control className= "mb-3" id="full-name" name="name" type="text" value={this.state.name} onChange={this.handleChange}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label htmlFor="email">Email</Form.Label>
                        <Form.Control className= "mb-3" id="email" name="email" type="email" value={this.state.email} onChange={this.handleChange}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label htmlFor="message">Message</Form.Label>
                        <Form.Control className= "mb-3" id="message" name="message" as="textarea" rows='3' value={this.state.message} onChange={this.handleChange}></Form.Control>
                    </Form.Group>

                    <Button className="d-inline-block" variant="primary" type="submit" disabled={this.state.disabled}>
                        Send
                    </Button>

                    {this.state.emailSent === true && <p className="d-inline success-msg">Email Sent!</p>}
                    {this.state.emailSent === false && <p className="d-inline error-msg">Could Not Send Email!</p>}
                    </Form>
            </Content>
        </div>
        );
    }
}

export default ContactForm;