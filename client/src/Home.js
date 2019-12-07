import React from "react";

// Importing CSS
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";


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