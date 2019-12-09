import React from "react";

// Importing CSS
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Polygon,
} from "react-google-maps";

const WrappedMap = withScriptjs(withGoogleMap(Map));

var boundary = require("./mygeodata/ne_10m_admin_0_countries.json")
console.log(boundary)
var boundsArray = []
var tempArr = []
var countries = []
var countryInfo = []

const westAfrica = [
  'Benin', 
  'Burkina Faso', 
  'Cameroon', 
  'Cape Verde', 
  'Chad', 
  'Ivory Coast', 
  'Equatorial Guinea', 
  'The Gambia', 
  'Ghana', 
  'Guinea', 
  'Guinea-Bissau', 
  'Liberia', 
  'Mali', 
  'Mauritania', 
  'Niger', 
  'Nigeria', 
  'Senegal', 
  'Sierra Leone',
  'Togo'
]

const angloAfrica = [
  'Cameroon',
  'The Gambia',
  'Ghana',
  'Liberia',
  'Nigeria',
  'Sierra Leone'
]

const countryID = {
  'Cameroon': 1, 
  'The Gambia': 2, 
  'Ghana': 3, 
  'Liberia': 4, 
  'Nigeria': 5, 
  'Sierra Leone': 6
}

function CountryHover() {
  const [show, setShow] = React.useState(true);

  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose} centered="true">
      <Modal.Header closeButton>
        <Modal.Title>Ghana</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul>
          <li>Population: 29,767,108</li>
          <li>GDP: 65.556</li>
          <li>Life Expectancy: 63.463</li>
          <li>School Enrollment: 103.569</li>
          <br />
          <li>
            <b>Percentage of Children in Labor (Ages 5-17): 30</b>
          </li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function Map() {

  for (var i = 0; i < boundary['features'].length; i++) {
    if (westAfrica.indexOf(boundary['features'][i]['properties']['NAME_EN']) >= 0) {
      tempArr.push(boundary['features'][i]['geometry']['coordinates'])
      countries.push(boundary['features'][i]['properties']['NAME_EN'])
    }
  }
  console.log(tempArr)
  tempArr.forEach(arr => {
    var countryArr = []
    if (arr.length === 1) {
      arr.forEach(row => {
        row.forEach(coord => {
          countryArr.push({"lat": coord[1], "lng": coord[0]})
        })
      })
    } else {
      arr.forEach(singular => {
        singular.forEach(row => {
          row.forEach(coord => {
            countryArr.push({"lat": coord[1], "lng": coord[0]})
        })
      })
      })
    }
    boundsArray.push(countryArr)
  })
  console.log(boundsArray)
  console.log(countries)
  var cnt = 0
  countries.forEach(country => {
    countryInfo.push({"name": country, "latlng": boundsArray[cnt]})
    cnt += 1
  })
  console.log(countryInfo)
  
  // Define the LatLng coordinates for the polygon's path.
  
  return (
    <React.Fragment>
      <GoogleMap defaultZoom={5} defaultCenter={{ lat: 14, lng: 4 }} mapTypeId="hybrid">
      { countryInfo.map(x => {
        if (angloAfrica.indexOf(x['name']) >=0) {
          console.log(countryID[x['name']])
          return (
              <Polygon
                onlClick={ () => {
                  (window.location.pathname =  `/country/${countryID[x['name']] 
                }`)
                }}
                path={ x['latlng'] }
                geodesic={true}
                options={{
                  strokeColor: "#ff2527",
                  strokeOpacity: 1,
                  strokeWeight: 0,
                  fillColor: "#25ff27"
                }}
                key = {x['name']}
              />

            )
        } else {
          return (
            <Polygon
              path={ x['latlng'] }
              geodesic={true}
              options={{
                strokeColor: "#ff2527",
                strokeOpacity: 1,
                strokeWeight: 0,
                fillColor: "#ff2527"
              }}
              key = {x['name']}
            />
            )}
      
            })}
        </GoogleMap>
        </React.Fragment>
      );
    }

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    this.setState({loading: false})
    
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return (
        <div className="text-center">
          <Spinner animation="border" variant="warning" className="mx-auto" />
        </div>
      );
    } else {
      return (
        <React.Fragment>
          <div style={{ width: "100vw", height: "50vw" }}>
            <WrappedMap
              googleMapURL={
                "https://maps.googleapis.com/maps/api/js?key=AIzaSyB45a2xoq_9DskmFsrLCMQFmXdsH2ycufc&libraries=gemoetry,drawing,places"
              }
              loadingElement={<div style={{ height: "100%" }} />}
              containerElement={<div style={{ height: "100%" }} />}
              mapElement={<div style={{ height: "100%" }} />}
            />
          </div>
        </React.Fragment>
      );
    }
  }
}

export default Home;
