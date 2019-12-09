import React, { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import Spinner from "react-bootstrap/Spinner";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      countryId: 1,
      population: { label: "Population", data: [] },
      lifeExpectancy: { label: "Life Expectancy", data: [] },
      childLaborPercentage: { label: "Child Labor Percentage", data: [] },
      readingLevel: { label: "Reading Level", data: [] },
      sentiment: { label: "Sentiment", data: [] },
      subjectivity: { label: "Subjectivity", data: [] },
      enrollment: { label: "Primary School Enrollment", data: [] },

      chartData: {
        labels: ["1995", "2000", "2005", "2010", "2015 to Present"],
        datasets: [],
        backgroundColor: [
          "rgba(255,99,132,0.6)",
          "rgba(54,162,235,0.6)",
          "rgba(255,206,86,0.6)",
          "rgba(75,192,192,0.6)",
          "rgba(153,102,255,0.6)"
        ]
      }
    };
  }

  componentDidMount() {
    console.log("hi");
    // Should be this.props.location.pathname
    fetch(`/country/${this.state.countryId}`)
      .then(response => response.json())
      .then(data =>
        data[1].forEach(data => {
          let population = this.state.population.data;
          let lifeExpectancy = this.state.lifeExpectancy.data;
          let childLaborPercentage = this.state.childLaborPercentage.data;
          let readingLevel = this.state.readingLevel.data;
          let sentiment = this.state.sentiment.data;
          let subjectivity = this.state.subjectivity.data;
          let enrollment = this.state.enrollment.data;
          population.push(data.population);
          lifeExpectancy.push(data.lifeExp);
          childLaborPercentage.push(data.cLabor);
          readingLevel.push(data.readingLevel);
          sentiment.push(data.sentiment);
          subjectivity.push(data.subjectivity);
          enrollment.push(data.enrollment);
          this.setState({ population: { data: population } });
          this.setState({
            childLaborPercentage: { data: childLaborPercentage }
          });
          this.setState({
            readingLevel: {
              label: "Reading Level",
              data: readingLevel,
              backgroundColor: "rgba(255,99,132,0.6)"
            }
          });
          this.setState({
            sentiment: {
              label: "Sentiment",
              data: sentiment,
              backgroundColor: "rgba(54,162,235,0.6)"
            }
          });
          this.setState({
            subjectivity: {
              label: "Subjectitivity",
              data: subjectivity,
              backgroundColor: "rgba(255,206,86,0.6)"
            }
          });
          this.setState({
            enrollment: {
              label: "Primary School Enrollment",
              data: enrollment,
              backgroundColor: "rgba(75,192,192,0.6)"
            }
          });
          this.setState({
            lifeExpectancy: {
              label: "Life Expectancy",
              data: lifeExpectancy,
              backgroundColor: "rgba(153,102,255,0.6)"
            }
          });
          this.setState({ loading: false });
        })
      )
      .catch(error => console.log(error));
  }

  //input data from dtatbase to state...
  dataHandler(countryInfo) {
    let snapshotData = countryInfo[1];
    console.log(snapshotData);
    let popS = snapshotData.map(snapshot => snapshot.population);
    let lifeExpS = snapshotData.map(snapshot => snapshot.lifeExp);
    let cLabS = snapshotData.map(snapshot => snapshot.cLabor);
    let readingLvlS = snapshotData.map(snapshot => snapshot.readingLevel);
    let subjS = snapshotData.map(snapshot => snapshot.subjectivity);
    let sentS = snapshotData.map(snapshot => snapshot.sentiment);
    let enrollS = snapshotData.map(snapshot => snapshot.enrollment);
    this.setState({
      population: { data: popS }
    });
    this.setState({
      lifeExpectancy: { data: lifeExpS }
    });
    this.setState({
      childLaborPercentage: {
        data: cLabS
      }
    });
    this.setState({
      readingLevel: {
        data: readingLvlS
      }
    });
    this.setState({
      subjectivity: {
        data: subjS
      }
    });
    this.setState({
      sentiment: { data: sentS }
    });
    this.setState({
      enrollment: { data: enrollS }
    });
  }

  //to be used in props to establish what chartdata will be on the line graphs
  chartDataBuilder(array) {
    console.log("test", this.state.lifeExpectancy);
    let termsArray = [
      "population",
      "lifeExpectancy",
      "childLaborPercentage",
      "readingLevel",
      "sentiment",
      "subjectivity",
      "enrollment"
    ];
    console.log(array);
    let dataset = [];
    for (let i = 0; i < array.length; i++) {
      console.log("Loop number", i, array[i]);
      if (array[i] === termsArray[2]) {
        dataset.push(this.state.childLaborPercentage);
      } else if (array[i] === termsArray[1]) {
        dataset.push(this.state.lifeExpectancy);
      } else if (array[i] === termsArray[0]) {
        dataset.push(this.state.population);
      } else if (array[i] === termsArray[3]) {
        dataset.push(this.state.readingLevel);
      } else if (array[i] === termsArray[4]) {
        dataset.push(this.state.sentiment);
      } else if (array[i] === termsArray[5]) {
        dataset.push(this.state.subjectivity);
      } else if (array[i] === termsArray[6]) {
        dataset.push(this.state.enrollment);
      }
    }
    console.log("Dataset here", dataset);
    return dataset;
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="text-center">
          <Spinner animation="border" variant="warning" className="mx-auto" />
        </div>
      );
    } else {
      console.log("Country data", this.state.countryInfo);
      console.log("Random check", this.state.childLaborPercentage);
      return (
        <div id="chartdata">
          <Line
            data={{
              datasets: this.chartDataBuilder(["lifeExpectancy", "enrollment"]),
              labels: ["1995", "2000", "2005", "2010", "2015 to Present"],
              backgroundColor: [
                "rgba(255,99,132,0.6)",
                "rgba(54,162,235,0.6)",
                "rgba(255,206,86,0.6)",
                "rgba(75,192,192,0.6)",
                "rgba(153,102,255,0.6)"
              ]
            }}
            options={{
              maintainAspectRatio: true
            }}
          />
        </div>
      );
    }
  }
}

export default Chart;
