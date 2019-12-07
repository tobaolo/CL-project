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
import Breadcrumb from 'react-bootstrap/Breadcrumb';

import { Link } from "react-router-dom";


class PercentImage extends React.Component {
  constructor(props) {
    super(props);
    this.createFigure = this.createFigure.bind(this);
  }

  createFigure(num) {
    let imageArr = [];

    for (let i = 0; i < num; i++) {
      imageArr.push(
        <Image
          key={i}
          src="https://clipartstation.com/wp-content/uploads/2018/10/human-figure-clipart.png"
          className="percent-image"
        />
      );
    }

    return imageArr;
  }

  render() {
    return (
      <React.Fragment>
        {this.createFigure(this.props.percentage)}
      </React.Fragment>
    );
  }
}

class Country extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countryInfo: [],
      loading: true,
      countryId: 5
    };
  }

  componentDidMount() {
    // Should be this.props.location.pathname
    fetch(`/country/${this.state.countryId}`)
      .then(response => response.json())
      .then(countryInfo => this.setState({ countryInfo, loading: false }))
      .catch(error => console.log(error));
  }

  render() {
    const { countryInfo, loading } = this.state;

    if (loading) {
      return (
        <div className="text-center">
          <Spinner animation="grow" variant="warning" className="mx-auto" />
        </div>
      );
    } else {
      return (
        <React.Fragment>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>{countryInfo[0].Name}</Breadcrumb.Item>
          </Breadcrumb>
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
                <div className="flex-container">
                  <PercentImage
                    percentage={Math.round(countryInfo[1][0].cLabor / 2)}
                  />
                </div>
                <div className="slider">Slider goes here</div>
              </Col>
              <Col>
                <Image src={countryInfo[0].Image} className="country-map" />
              </Col>
            </Row>
          </Container>
          <div>
            <h3>Articles</h3>
            <ListGroup variant="flush">
              <ListGroup.Item active={false}>
                <Link
                  to={`/article/${countryInfo[1][0].articleId}`}
                  className="articles-list"
                >
                  {countryInfo[1][0].articleTitle}
                </Link>
              </ListGroup.Item>
              <ListGroup.Item active={false}>
                <Link
                  to={`/article/${countryInfo[1][1].articleId}`}
                  className="articles-list"
                >
                  {countryInfo[1][1].articleTitle}
                </Link>
              </ListGroup.Item>
              <ListGroup.Item active={true}>
                <Link
                  to={`/article/${countryInfo[1][2].articleId}`}
                  className="articles-list"
                >
                  {countryInfo[1][2].articleTitle}
                </Link>
              </ListGroup.Item>
              <ListGroup.Item active={false}>
                <Link
                  to={`/article/${countryInfo[1][3].articleId}`}
                  className="articles-list"
                >
                  {countryInfo[1][3].articleTitle}
                </Link>
              </ListGroup.Item>
              <ListGroup.Item active={false}>
                <Link
                  to={`/article/${countryInfo[1][4].articleId}`}
                  className="articles-list"
                >
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
