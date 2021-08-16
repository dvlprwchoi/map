import React from 'react';
import './App.css';
import {
  InfoWindow,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

const Google_map_API = process.env.REACT_APP_GOOGLE_MAP_API;
// console.log(Google_map_API);

class App extends React.Component {
  state = {
    address: '',
    city: '',
    area: '',
    state: '',
    zoom: 15,
    height: 400,
    mapPosition: {
      lat: 0,
      lng: 0,
    },
    markerPosition: {
      lat: 0,
      lng: 0,
    },
  };

  render() {
    const MapWithAMarker = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          defaultZoom={10}
          defaultCenter={{ lat: 30.2672, lng: -97.7431 }}
        >
          <Marker position={{ lat: 30.2672, lng: -97.7431 }}>
            <InfoWindow>
              <div>Hello</div>
            </InfoWindow>
          </Marker>
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
