import React, {Component} from 'react';
import MapGL, {Popup} from 'react-map-gl';
import Pins from "../components/Pin/index.js";
import Info from "../components/Info/index.js"
import "../../node_modules/mapbox-gl/dist/mapbox-gl.css";
import "./Maps.css"

//key is public default key, because Mapbox doesn't work without the token being pre-defined
let MAPBOX_TOKEN = "pk.eyJ1Ijoic2FpZ29ub21haSIsImEiOiJjazc1azhjNmIwMWpwM21zdnNuZnYyOHVhIn0.MS2S6fhWPQz_SQrEEstzUw"

const data = [
        {"city":"Vancouver","province":"British Columbia","description":"Total: 7 cases","latitude":49.2827,"longitude":-123.1207},
        {"city":"London","province":"Ontario","description":"Total: 1 case","latitude":42.9849,"longitude":-81.2453},
        {"city":"Toronto","province":"Ontario","description":"Total: 5 cases","latitude":43.6532,"longitude":-79.3832}
    ]

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
            },
            popupInfo: null
        };
    }

    renderPopup() {
        const {popupInfo} = this.state;
    
        return (
          popupInfo && (
            <Popup className="popup"
              tipSize={5}
              anchor="top"
              closeButton={false}
              longitude={popupInfo.longitude}
              latitude={popupInfo.latitude}
              onClose={() => this.setState({popupInfo: null})}
            >
              <Info info={popupInfo} />
            </Popup>
          )
        );
      }
      onClickMarker = city => {
        this.setState({popupInfo: city});
      };

    render() {
        return (
            <MapGL
            {...this.state.viewport}
            width="98vw"
            height="70vh"
            mapStyle="mapbox://styles/mapbox/dark-v9"
            onViewportChange={viewport => this.setState({viewport})}
            mapboxApiAccessToken={MAPBOX_TOKEN}
          >

            <Pins data={data} onClick={this.onClickMarker} />

            {this.renderPopup()}

          </MapGL>
        );
    }
}

export default Maps;