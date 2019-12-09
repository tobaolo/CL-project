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
  OverlayView,
  Polygon
} from "react-google-maps";

const WrappedMap = withScriptjs(withGoogleMap(Map));

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
  // Define the LatLng coordinates for the polygon's path.
  var triangleCoords = [
    { lat: 14, lng: 4 },
    { lat: 14, lng: 3 },
    { lat: 15, lng: 4 },
    { lat: 15, lng: 3 }
  ];

  return (
    <React.Fragment>
      <GoogleMap defaultZoom={5} defaultCenter={{ lat: 14, lng: 4 }} />
      <Polygon
        path={triangleCoords}
        geodesic={true}
        options={{
          strokeColor: "#ff2527",
          strokeOpacity: 0.75,
          strokeWeight: 2,
          fillColor: "#ff2527"
        }}
      />
      <OverlayView position={{ lat: 14, lng: 4 }} />
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

  componentDidMount() {}

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
              "https://maps.googleapis.com/maps/api/js?key=AIzaSyB45a2xoq_9DskmFsrLCMQFmXdsH2ycufc&libraries=gemoetry,drawing,places&callback=initMap"
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
          <Link to="/country/5">
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
