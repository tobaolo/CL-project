import React from "react";

// Importing CSS
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Polygon
} from "react-google-maps";

const WrappedMap = withScriptjs(withGoogleMap(Map));

var boundary = require("./mygeodata/ne_10m_admin_0_countries.json")
console.log(boundary)
var boundsArray = []
var tempArr = []

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
      
    }
  }
  console.log(tempArr)
  
  tempArr[1].forEach(arr => {
    var countryArr = []
    arr.forEach(coord => {
      countryArr.push({"lat": coord[1], "lng": coord[0]})
    })
    boundsArray.push(countryArr)
    
  })
  console.log(boundsArray)
  
  // Define the LatLng coordinates for the polygon's path.
  

  return (
    <React.Fragment>
      <GoogleMap defaultZoom={5} defaultCenter={{ lat: 14, lng: 4 }} />
      {/* { boundsArray.map(x => {
        return (
<Polygon
            path={ x }
            geodesic={true}
            options={{
              strokeColor: "#ff2527",
              strokeOpacity: 1,
              strokeWeight: 2,
              fillColor: "#ff2527"
          }}
          />) */}
        )
      } }

      )
          <Polygon
            path={ boundsArray[0] }
            geodesic={true}
            options={{
              strokeColor: "#ff2527",
              strokeOpacity: 1,
              strokeWeight: 2,
              fillColor: "#ff2527"
          }}
          />)
      })
      }
      
        
      />
    </React.Fragment>
  );
}

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isHovering: false
    };
  }

  componentDidMount() {
    
  }

  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }

  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering
    };
  }

  render() {
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
        <div
          onMouseEnter={this.handleMouseHover.bind(this)}
          onMouseLeave={this.handleMouseHover.bind(this)}
        >
          <Link to="/country">
            <Image
              src="https://www.solidaridadnetwork.org/sites/solidaridadnetwork.org/files/west_africa.JPG"
              alt="This is where our interactive map will go"
              className="map-pic"
            />
          </Link>
        </div>
        {this.state.isHovering && <CountryHover />}
        <div className="slider">Slider goes here</div>
      </React.Fragment>
    );
  }
}

export default Home;
