import React from "react";

// Importing CSS
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";


class Country extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
      return (
        <React.Fragment>
          <h1>Ghana</h1>
          <Container fluid="true">
            <Row>
              <Col>
                <h4>Population: 29,767,108</h4>
                <h4>GDP: 65.556</h4>
                <h4>Life Expectancy: 63.463</h4>
                <h4>School Enrollment: 103.569</h4>
              </Col>
              <Col>
                <Image
                  src="https://i.ya-webdesign.com/images/children-holding-hands-png-4.png"
                  className="country-map"
                />
                <div className="slider">Slider goes here</div>
              </Col>
              <Col>
                <Image
                  src="https://www.freeworldmaps.net/africa/ghana/ghana-physical-map.jpg"
                  className="country-map"
                />
              </Col>
            </Row>
          </Container>
          <div>
            <h3>Articles</h3>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Link
                  to="article"
                  className="articles-list"
                >
                  Ghana Labor Practices
                </Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Link
                  to="article"
                  className="articles-list"
                >
                  Ghana Labor Practices
                </Link>
              </ListGroup.Item>
              <ListGroup.Item active>
                <Link
                  to="/article"
                  className="articles-list"
                >
                  Ghana Labor Practices
                </Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Link
                  to="/article"
                  className="articles-list"
                >
                  Ghana Labor Practices
                </Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Link
                  to="/article"
                  className="articles-list"
                >
                  Ghana Labor Practices
                </Link>
              </ListGroup.Item>
            </ListGroup>
          </div>
        </React.Fragment>
      );
  }
}

export default Country