import React from "react";

// Importing CSS
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Importing a few elements from react-bootstrap for design aesthetics
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleInfo: [],
      loading: true,
      articleId: 7
    };
  }

  componentDidMount() {
    fetch(`/article/${this.state.articleId}`)
      .then(response => response.json())
      .then(articleInfo => this.setState({ articleInfo, loading: false }));
  }

  render() {
    const { articleInfo, loading } = this.state;

    if (loading) {
      return (
        <div className="text-center">
          <Spinner animation="grow" variant="warning" className="mx-auto" />
        </div>
      );
    } else {
      console.log(articleInfo);
      return (
        <React.Fragment>
          <Container fluid="true">
            <Row>
              <Col>
                <h1>{articleInfo.title}</h1>
                <h3>{articleInfo.articleCountry}</h3>
                <br />
                <h2>Abstract</h2>
                <p>
                  {articleInfo.abstract}.{" "}
                  <span>
                    <b>
                      Read full text <a href={articleInfo.link}>here</a>.
                    </b>
                  </span>
                </p>
              </Col>
              <Col>
                <Image
                  src={articleInfo.countryImage}
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
}

export default Article;
