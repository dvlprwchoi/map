import React from 'react';
import './App.css';
import {
  InfoWindow,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import Geocode from 'react-geocode';

const Google_map_API = process.env.REACT_APP_GOOGLE_MAP_API;
// console.log(Google_map_API);

Geocode.setApiKey(Google_map_API);

class App extends React.Component {
  state = {
    address: '',
    city: '',
    county: '',
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

  // get city name function
  getCity = (addressArray) => {
    let city = '';
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0] === 'locality') {
        city = addressArray[i].long_name;
        return city;
      }
    }
  };

  // get county name function
  getCounty = (addressArray) => {
    let county = '';
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0] === 'administrative_area_level_2') {
        county = addressArray[i].long_name;
        return county;
      }
    }
  };

  // get state name function
  getState = (addressArray) => {
    let state = '';
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0] === 'administrative_area_level_1') {
        state = addressArray[i].long_name;
        return state;
      }
    }
  };

  // get zip code function
  getZip = (addressArray) => {
    let zip = '';
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0] === 'postal_code') {
        zip = addressArray[i].long_name;
        return zip;
      }
    }
  };

  // handle marker drag end function
  handleMarkerDragEnd = (e) => {
    let newLat = e.latLng.lat();
    let newLng = e.latLng.lng();
    // console.log(newLat, newLng);

    // Geocode
    // Getting address information from new lat and lng
    Geocode.fromLatLng(newLat, newLng).then((response) => {
      // console.log(response.results[0]);
      const address = response.results[0].formatted_address;
      // console.log(address);

      const addressArray = response.results[0].address_components;
      // console.log(addressArray);

      const city = this.getCity(addressArray);
      const county = this.getCounty(addressArray);
      const state = this.getState(addressArray);
      const zip = this.getZip(addressArray);

      console.log(city, county, state, zip);

      this.setState({
        address: address ? address : '',
        city: city ? city : '',
        county: county ? county : '',
        state: state ? state : '',
        markerPosition: {
          lat: newLat,
          lng: newLng,
        },
        mapPosition: {
          lat: newLat,
          lng: newLng,
        },
      });
    });
  };

  render() {
    const MapWithAMarker = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          defaultZoom={10}
          // defaultCenter={{ lat: 30.2672, lng: -97.7431 }}
          defaultCenter={{
            lat: this.state.mapPosition.lat,
            lng: this.state.mapPosition.lng,
          }}
        >
          <Marker
            draggable={true}
            onDragEnd={this.handleMarkerDragEnd}
            // position={{ lat: 30.2672, lng: -97.7431 }}
            position={{
              lat: this.state.markerPosition.lat,
              lng: this.state.markerPosition.lng,
            }}
          >
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
