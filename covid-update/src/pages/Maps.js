import React, {Component} from 'react';
import API from "../utils/API";
import MapGL, {Source, Layer} from 'react-map-gl';
import "../../node_modules/mapbox-gl/dist/mapbox-gl.css"

//key is public default key
let MAPBOX_TOKEN = ""

class Maps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
            latitude: 58,
            longitude: -98,
            zoom: 3,
            bearing: 0,
            pitch: 0,
            }
        };
    }

    render() {
        const {viewport} = this.state;

        return (
            <MapGL
            {...this.state.viewport}
            width="100vw"
            height="70vh"
            mapStyle="mapbox://styles/mapbox/dark-v9"
            onViewportChange={viewport => this.setState({viewport})}
            mapboxApiAccessToken={MAPBOX_TOKEN}
          />
        );
    }
}

export default Maps;