import React from "react";
import GoogleMapReact from "google-map-react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function Maps() {
  const defaultProps = {
    center: {
      lat: 7.019529,
      lng: 79.9,
    },
    zoom: 12,
  };

  return (
    <>
      <Container>
        <Row>
          <Col>Below is direction for my map location</Col>
          <Col>
            <div style={{ height: "100vh", width: "100%" }}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: process.env.REACT_APP_API_KEY,
                }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
              >
                <AnyReactComponent
                  lat={7.019529}
                  lng={79.9}
                  text={process.env.REACT_APP_PLACE_NAME}
                />
              </GoogleMapReact>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
