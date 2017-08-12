import React, { Component }  from 'react'
import { Map, TileLayer, Polygon, GeoJSON } from 'react-leaflet'

class MultiviewMapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      context: props.context,
      geojson: null,
      color: 'red',
      featureId: '',
      lat: 51.3,
      lng: 10,
      zoom: 5.5,
    };
    // Subscribe to featureId events.
    this.state.context.subscribe(this, this.onChange);
  }
  onChange(context, that) {
    // Update the state value for featureId.
    that.setState({
      featureId: context.featureId,
      geojson: context.geometry
    });
  }
  hasGeometry(){
    return this.state.geojson != null;
  }
  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <div>
        <span>Selected feature ID: <strong>{this.state.featureId}</strong></span>
        <Map center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          { this.hasGeometry() &&
              <GeoJSON data={this.state.geojson}>
              </GeoJSON>
          }
        </Map>
      </div>
    );
  }
}

export default MultiviewMapComponent;
