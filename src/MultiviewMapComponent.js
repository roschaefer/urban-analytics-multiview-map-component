import React, { Component }  from 'react'
import { Map, Marker, Popup, TileLayer, Polygon, GeoJSON } from 'react-leaflet'
import { DebugViewComponent } from './DebugViewComponent.js' 

class MultiviewMapComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			context: props.context,
			geojsonUrl: null,
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
		console.log('update the react map');
		if(context.geojsonUrl != null){
			fetch(context.geojsonUrl).then((resp) => resp.json()).then((response) => {
				that.setState({
					featureId: context.featureId,
					geojsonUrl: context.geojsonUrl,
					geojson: response
				});
			}).catch((err) => {
				console.log(err);
			});
		}
	}
	handleSubmit(featureId, geojsonUrl){
		console.log('changedfeatureId', featureId);
		console.log('changedGeojsonUrl', geojsonUrl);
		this.state.context.featureId = featureId;
		this.state.context.geojsonUrl = geojsonUrl;
	}
	hasGeometry(){
		return this.state.geojson != null;
	}
	render() {
		const position = [this.state.lat, this.state.lng];
		return (
			<div>
			<Map center={position} zoom={this.state.zoom}>
			<TileLayer
			attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
			/>
			{ this.hasGeometry() &&
				<GeoJSON data={this.state.geojson}>
				</GeoJSON>
			}
			<Marker position={position}>
			<Popup>
			<span><strong>Feature Id:</strong> {this.state.featureId}.</span>
			</Popup>
			</Marker>
			</Map>
			{ this.state.featureId && this.state.geojsonUrl &&
			<DebugViewComponent
				featureId={this.state.featureId}
				geojsonUrl={this.state.geojsonUrl}
				handleSubmit={(featureId, geojsonUrl) => this.handleSubmit(featureId, geojsonUrl)}>
			</DebugViewComponent>
			}
			</div>
		);
	}
}

export default MultiviewMapComponent;
