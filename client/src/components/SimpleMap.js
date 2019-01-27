import React, { Component } from "react";
import { compose, withStateHandlers } from "recompose";
import {
  InfoWindow,
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker
} from "react-google-maps";

const Map = compose(
  withStateHandlers(
    () => ({
      isMarkerShown: false,
      markerPosition: null
    }),
    {
      onMapClick: ({ isMarkerShown }) => e => {
        return {
          markerPosition: e.latLng,
          isMarkerShown: true
        };
      }
    }
  ),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
    onClick={props.onMapClick}
  >
    {props.isMarkerShown && (
      <Marker
        position={props.markerPosition}
        icon="https://i.ibb.co/DMJR4WJ/map-marker-hi-2-1.png"
      />
    )}
    {
      <Marker
        position={{ lat: props.lat, lng: props.lng }}
        icon="https://i.ibb.co/PNLnTpX/map-marker-hi-2.png"
      />
    }
    {props.data.map(function(object, i) {
      return (
        <Marker
          position={{ lat: object.lat, lng: object.lng }}
          icon="https://i.ibb.co/PNLnTpX/map-marker-hi-2.png"
        />
      );
    })}
  </GoogleMap>
));

export default class SampleMap extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ height: "100%" }}>
        <Map
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCWM4QgKRRQIin27qATBf463PHhzA4kaug"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `860px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          lat={this.props.lat}
          lng={this.props.lng}
          data={this.props.content}
          handlePost={this.props.handlePost}
        />
      </div>
    );
  }
}
