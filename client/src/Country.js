import React from "react";

// Importing CSS
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Importing a few elements from react-bootstrap for design aesthetics
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";

import { Link } from "react-router-dom";

class Country extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countryInfo: [],
      loading: true,
      countryId: 6
    };
  }

  componentDidMount() {
    // Should be `/country/${this.props.id}`
    fetch(`/country/${this.state.countryId}`)
      .then(response => response.json())
      .then(countryInfo => this.setState({ countryInfo, loading: false }))
      .catch(error => console.log(error))
  }

  render() {
    const { countryInfo, loading } = this.state;

    if (loading) {
      console.log(countryInfo);
      return (
        <div className="text-center">
          <Spinner animation="grow" variant="warning" className="mx-auto" />
        </div>
      );
    } else {
      console.log(countryInfo);
      return (
        <React.Fragment>
          <h1>{countryInfo[0].Name}</h1>
          <Container fluid="true">
            <Row>
              <Col>
                <h4>Population: {countryInfo[1][0].population}</h4>
                <h4>GDP: {countryInfo[1][0].GDP}</h4>
                <h4>Life Expectancy: {countryInfo[1][0].lifeExp}</h4>
                <h4>School Enrollment: {countryInfo[1][0].enrollment}</h4>
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
                  src={countryInfo[0].Image}
                  className="country-map"
                />
              </Col>
            </Row>
          </Container>
          <div>
            <h3>Articles</h3>
            <ListGroup variant="flush">
              <ListGroup.Item active={false}>
                <Link to="article" className="articles-list">
                  {countryInfo[1][0].articleTitle}
                </Link>
              </ListGroup.Item>
              <ListGroup.Item active={false}>
                <Link to="article" className="articles-list">
                  {countryInfo[1][1].articleTitle}
                </Link>
              </ListGroup.Item>
              <ListGroup.Item active={true}>
                <Link to="/article" className="articles-list">
                  {countryInfo[1][2].articleTitle}
                </Link>
              </ListGroup.Item>
              <ListGroup.Item active={false}>
                <Link to="/article" className="articles-list">
                  {countryInfo[1][3].articleTitle}
                </Link>
              </ListGroup.Item>
              <ListGroup.Item active={false}>
                <Link to="/article" className="articles-list">
                  {countryInfo[1][4].articleTitle}
                </Link>
              </ListGroup.Item>
            </ListGroup>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default Country;
