import React from "react";

// Importing CSS
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Polygon,
} from "react-google-maps";

const WrappedMap = withScriptjs(withGoogleMap(Map));

var boundary = require("./mygeodata/ne_10m_admin_0_countries.json")
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

function Map() {

  for (var i = 0; i < boundary['features'].length; i++) {
    if (westAfrica.indexOf(boundary['features'][i]['properties']['NAME_EN']) >= 0) {
      tempArr.push(boundary['features'][i]['geometry']['coordinates'])
      countries.push(boundary['features'][i]['properties']['NAME_EN'])
    }
  }
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
  var cnt = 0
  countries.forEach(country => {
    countryInfo.push({"name": country, "latlng": boundsArray[cnt]})
    cnt += 1
  })
  
  // Define the LatLng coordinates for the polygon's path.
  return (
    <React.Fragment>
      <GoogleMap defaultZoom={5.5} defaultCenter={{ lat: 9, lng: 4 }} mapTypeId="hybrid">
        { countryInfo.map(x => {
          if (angloAfrica.indexOf(x['name']) >=0) {
            return (
                <Polygon
                  onClick={ () => {
                    (window.location.pathname =  `/country/${countryID[x['name']] 
                  }`)
                  }}
                  path={ x['latlng'] }
                  geodesic={true}
                  options={{
                    strokeColor: "#ff2527",
                    strokeOpacity: 1,
                    strokeWeight: 0,
                    fillColor: "#ff25ff"
                  }}
                  key = {x['name']}
                />
              )
          } 
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
