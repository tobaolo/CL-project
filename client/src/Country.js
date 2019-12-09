import React from "react";

// Importing CSS
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";

// Importing a few elements from react-bootstrap for design aesthetics
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Jumbotron from "react-bootstrap/Jumbotron";

import LineChart from "./components/chart";

import { Link } from "react-router-dom";

import Slider from "rc-slider";

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
      timeframe: { value: 4 },
      countryId: 5
    };
    this.listItemActive = this.listItemActive.bind(this);
  }

  componentDidMount() {
    // Should be this.props.location.pathname
    fetch(this.props.location.pathname)
      .then(response => response.json())
      .then(countryInfo => this.setState({ countryInfo, loading: false }))
      .catch(error => console.log(error));
  }

  updateSliderTimeframe(value) {
    this.setState({ timeframe: { value } });
  }

  listItemActive(eventKey) {
    if (eventKey === this.state.timeframe.value) {
      return true;
    }
    return false;
  }

  render() {
    const { countryInfo, loading } = this.state;
    const timeframe = this.state.timeframe.value;

    const wrapperStyle = {
      width: "80vw",
      margin: "2rem",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto"
    };

    if (loading) {
      return (
        <div className="text-center">
          <Spinner animation="border" variant="warning" className="mx-auto" />
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
          <div>
            <Container fluid="true">
              <Row>
                <Col>
                  <h4>Population: {countryInfo[1][timeframe].population}</h4>
                  <h4>GDP: {countryInfo[1][timeframe].GDP}</h4>
                  <h4>Life Expectancy: {countryInfo[1][timeframe].lifeExp}</h4>
                  <h4>
                    School Enrollment: {countryInfo[1][timeframe].enrollment}
                  </h4>
                </Col>
                <Col>
                  <Jumbotron className="flex-container">
                    <PercentImage
                      percentage={Math.round(
                        countryInfo[1][timeframe].cLabor / 2
                      )}
                    />
                  </Jumbotron>
                  <div>
                    Percentage of children, ages{" "}
                    {countryInfo[1][timeframe].minAge} to{" "}
                    {countryInfo[1][timeframe].maxAge}, in labor
                  </div>
                </Col>
                <Col>
                  <Image src={countryInfo[0].Image} className="country-map" />
                </Col>
              </Row>
            </Container>
          </div>
          <div style={wrapperStyle}>
            <Slider
              className="slider"
              min={0}
              max={4}
              defaultValue={4}
              marks={{
                0: "1996-2000",
                1: "2001-2005",
                2: "2006-2010",
                3: "2011-2015",
                4: "2015-2020"
              }}
              step={null}
              onChange={this.updateSliderTimeframe.bind(this)}
            />
          </div>
          <LineChart />
          <div>
            <h3>Articles</h3>
            <ListGroup variant="flush">
              <ListGroup.Item action active={this.listItemActive(0)}>
                <Link
                  to={`/article/${countryInfo[1][0].articleId}`}
                  className="articles-list"
                >
                  {countryInfo[1][0].articleTitle}
                </Link>
              </ListGroup.Item>
              <ListGroup.Item action active={this.listItemActive(1)}>
                <Link
                  to={`/article/${countryInfo[1][1].articleId}`}
                  className="articles-list"
                >
                  {countryInfo[1][1].articleTitle}
                </Link>
              </ListGroup.Item>
              <ListGroup.Item action active={this.listItemActive(2)}>
                <Link
                  to={`/article/${countryInfo[1][2].articleId}`}
                  className="articles-list"
                >
                  {countryInfo[1][2].articleTitle}
                </Link>
              </ListGroup.Item>
              <ListGroup.Item action active={this.listItemActive(3)}>
                <Link
                  to={`/article/${countryInfo[1][3].articleId}`}
                  className="articles-list"
                >
                  {countryInfo[1][3].articleTitle}
                </Link>
              </ListGroup.Item>
              <ListGroup.Item action active={this.listItemActive(4)}>
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
