import React from 'react';
import './App.css';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

const Google_map_API = process.env.REACT_APP_GOOGLE_MAP_API;
// console.log(Google_map_API);

class App extends React.Component {
  render() {
    const MapWithAMarker = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          defaultZoom={8}
          defaultCenter={{ lat: -34.397, lng: 150.644 }}
        >
          <Marker position={{ lat: -34.397, lng: 150.644 }} />
        </GoogleMap>
      ))
    );

    return (
      <MapWithAMarker
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${Google_map_API}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}

export default App;
