import React, { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      title: {},
      sentiment: {},
      subjectivity: {},
      readingLevel: {},
      avgSentLen: {},
      avgWordLen: {},
      numChars: {},
      numSents: {},
      numWords: {}
    };
  }

  componentDidMount() {
    fetch(window.location.pathname)
      .then(response => response.json())
      .then(data => {
        this.setState({ title: data.title });
        this.setState({ sentiment: data.sentiment });
        this.setState({ subjectivity: data.subjectivity });
        this.setState({ readingLevel: data.readingLevel });
        this.setState({ avgSentLen: data.avgSentLen });
        this.setState({ avgWordLen: data.avgWordLen });
        this.setState({ numChars: data.numChars });
        this.setState({ numSents: data.numSents });
        this.setState({ numWords: data.numWords });
      })
      .catch(error => console.log(error));
  }

  barChartDataBuilder(array) {
    let termsArray = [
      "sentiment",
      "subjectivity",
      "readingLevel",
      "avgSentLen",
      "avgWordLen",
      "numChars",
      "numSents",
      "numWords"
    ];
    let data = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i] === termsArray[0]) {
        data.push(this.state.sentiment);
      } else if (array[i] === termsArray[1]) {
        data.push(this.state.subjectivity);
      } else if (array[i] === termsArray[2]) {
        data.push(this.state.readingLevel);
      } else if (array[i] === termsArray[3]) {
        data.push(this.state.avgSentLen);
      } else if (array[i] === termsArray[4]) {
        data.push(this.state.avgWordLen);
      } else if (array[i] === termsArray[5]) {
        data.push(this.state.numChars);
      } else if (array[i] === termsArray[6]) {
        data.push(this.state.numSents);
      } else if (array[i] === termsArray[7]) {
        data.push(this.state.numWords);
      }
    }

    console.log("Bar Data", data);
    return data;
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <Spinner
            animation="border"
            variant="warning"
            className="mx-auto"
          ></Spinner>
        </div>
      );
    } else {
      return (
        <Row>
          <Col>
            <Bar
              data={{
                datasets: [
                  {
                    label: this.state.title,
                    data: this.barChartDataBuilder([
                      "avgSentLen",
                      "avgWordLen",
                      "readingLevel"
                    ])
                  }
                ],
                labels: [
                  "Average Sentence Length",
                  "Average Word Length",
                  "Reading Level"
                ]
              }}
            ></Bar>
          </Col>
          <Col>
            <Bar
              data={{
                datasets: [
                  {
                    label: this.state.title,
                    data: this.barChartDataBuilder([
                      "sentiment",
                      "subjectivity"
                    ]),
                    labels: ["Sentiment", "Subjectivity"]
                  }
                ]
              }}
            ></Bar>
          </Col>
        </Row>
      );
    }
  }
}

export default BarChart;
