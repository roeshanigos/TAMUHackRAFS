import React, {Component} from 'react';
import { compose, withStateHandlers } from "recompose";
import { InfoWindow, withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps';


const Map = compose(
    withStateHandlers(() => ({
        isMarkerShown: false,
        markerPosition: null
      }), {
        onMapClick: ({ isMarkerShown }) => (e) => ({
            markerPosition: e.latLng,
            isMarkerShown:true,
        })
      }),
    withScriptjs,
    withGoogleMap
)
    (props =>
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat: props.lat, lng: props.lng}}
            onClick={props.onMapClick}
        >
            {props.isMarkerShown && <Marker position={props.markerPosition} icon = 'https://i.ibb.co/DMJR4WJ/map-marker-hi-2-1.png'/>}
            { <Marker position = {{ lat: props.lat, lng: props.lng }} icon ='https://i.ibb.co/PNLnTpX/map-marker-hi-2.png'/>}
            {props.data.map(function(object, i){
                return <Marker position = {{ lat: object.lat, lng: object.lng }} icon ='https://i.ibb.co/PNLnTpX/map-marker-hi-2.png'/>
            })}
        </GoogleMap>
    )

export default class SampleMap extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          lat: 30.6280,
          lng: -96.3344
        }
    }
    
    componentDidUpdate() {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          console.log(coords.latitude, coords.longitude)
          this.setState({
              lat: coords.latitude,
              lng: coords.longitude
          });
        });
      }
    }

    render() {

        return (
            <div style={{ height: '100%' }}>
                <Map
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCWM4QgKRRQIin27qATBf463PHhzA4kaug"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `860px` }}/>}
                    mapElement={<div style={{ height: `100%` }} />}
                    lat={this.state.lat}
                    lng={this.state.lng}
                    data = {this.props.content}
                />
            </div>
        )
    }
}
