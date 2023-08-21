import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';


function Hero(props) {
    return(
        <div class = "bg-transparent p-0 rounded-lg m-3" fluid={true}>
            <Container fluid={true}r>
                <Row className="justify-content-center py-5">
                    <Col md={8} sm={12}>
                    {props.title && <h1 class = "display-1 fw-bolder">{props.title}</h1>}
                    {props.subTitle && <h3 class = "display-4 fw-light">{props.subTitle}</h3>}
                    {props.text && <h3 class = "lead fw-light">{props.text}</h3>}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Hero;