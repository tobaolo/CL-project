import React, { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryId: 1,
      countryInfo: [],
      population: { label: "Population", data: [] },
      lifeExpectancy: { label: "Life Expectancy", data: [] },
      childLaborPercentage: { label: "Child Labor Percentage", data: [] },
      readingLevel: { label: "Reading Level", data: [] },
      sentiment: { label: "Sentiment", data: [] },
      subjectivity: { label: "Subjectivity", data: [] },
      enrollment: { label: "Primary School Enrollment", data: {} },

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
    // Should be this.props.location.pathname
    fetch(`/country/${this.state.countryId}`)
      .then(response => response.json())
      .then(countryInfo => this.setState({ countryInfo, loading: false }))
      .catch(error => console.log(error));
    console.log("Country info here!");
    console.log(this.state.countryInfo);
  }
  //input data from dtatbase to state...
  dataHandler(countryInfo) {
    console.log("THIS SHOULD BE OCCUPIED", countryInfo);
    var snapshotData = countryInfo[1];
    this.setState({
      population: { data: snapshotData.map(snapshot => snapshot.population) }
    });
    this.setState({
      lifeExpectancy: { data: snapshotData.map(snapshot => snapshot.lifeExp) }
    });
    this.setState({
      childLaborPercentage: {
        data: snapshotData.map(snapshot => snapshot.cLabor)
      }
    });
    this.setState({
      readingLevel: {
        data: snapshotData.map(snapshot => snapshot.readingLevel)
      }
    });
    this.setState({
      subjectivity: {
        data: snapshotData.map(snapshot => snapshot.subjectivity)
      }
    });
    this.setState({
      sentiment: { data: snapshotData.map(snapshot => snapshot.sentiment) }
    });
    this.setState({
      enrollment: { data: snapshotData.map(snapshot => snapshot.enrollment) }
    });
  }

  //to be used in props to establish what chartdata will be on the line graphs
  chartDataBuilder(array) {
    let termsArray = [
      "population",
      "lifeExpectancy",
      "childLaborPercentage",
      "readingLevel",
      "sentiment",
      "subjectivity",
      "enrollment"
    ];
    let dataset = [];
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < termsArray.length; j++) {
        if (array[i] === termsArray[j]) {
          console.log(array[i], termsArray[j]);
          console.log("terms", this.state.termsArray[j]);
          dataset.push(this.state.termsArray[j]);
        }
      }
    }
    console.log(dataset);
    return dataset;
  }

  render() {
    console.log(this.state.countryInfo);
    return (
      <div id="chartdata">
        <Line
          data={{
            datasets: this.chartDataBuilder([
              "childLaborPercentage",
              "readingLevel",
              "enrollment"
            ]),
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
            maintainAspectRatio: false
          }}
        ></Line>
      </div>
    );
  }
}

export default Chart;
