import React from "react";

// Importing CSS
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
      return (
        <React.Fragment>
          <Container fluid="true">
            <Row>
              <Col>
                <h1>Ghana Labor Practices</h1>
                <h3>Ghana</h3>
                <br />
                <h2>Abstract</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.{" "}
                  <span>
                    <b>
                      Read full text{" "}
                      <a href="http://hubrural.org/IMG/pdf/stcp_ghana_labor_practices.pdf">
                        here
                      </a>
                      .
                    </b>
                  </span>
                </p>
              </Col>
              <Col>
                <Image
                  src="https://www.freeworldmaps.net/africa/ghana/ghana-physical-map.jpg"
                  className="country-map"
                />
              </Col>
            </Row>
            <h2>Charts</h2>
            <Row>
              <Col>
                <Image
                  src="https://devenwisner.files.wordpress.com/2019/04/overlapping-column-chart-deven-wisner-data-visualization.png?w=990"
                  className="country-map"
                />
              </Col>
              <Col>
                <Image
                  src="https://devenwisner.files.wordpress.com/2019/04/overlapping-column-chart-deven-wisner-data-visualization.png?w=990"
                  className="country-map"
                />
              </Col>
              <Col>
                <Image
                  src="https://devenwisner.files.wordpress.com/2019/04/overlapping-column-chart-deven-wisner-data-visualization.png?w=990"
                  className="country-map"
                />
              </Col>
              <Col>
                <Image
                  src="https://devenwisner.files.wordpress.com/2019/04/overlapping-column-chart-deven-wisner-data-visualization.png?w=990"
                  className="country-map"
                />
              </Col>
            </Row>
          </Container>
        </React.Fragment>
      );
  }
}

export default Article;