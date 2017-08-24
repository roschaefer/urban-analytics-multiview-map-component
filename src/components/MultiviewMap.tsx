import * as React from "react";
import { MapProps, Map, TileLayer, Polygon } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { DebugView } from './DebugView';

export interface  MultiviewMapProps {
    context: any;
}
export interface  MultiviewMapState {
    context: any;
    geojsonUrl: string;
    geojson: any;
    color: string;
    featureId: number;
    lat: number;
    lng: number;
    zoom: number;
}
export class MultiviewMap extends React.Component<MultiviewMapProps, MultiviewMapState> {
	constructor(props: MultiviewMapProps) {
		super(props);
		this.state = {
			context: props.context,
			geojsonUrl: null,
			geojson: null,
			color: 'red',
			featureId: null,
			lat: 51.3,
			lng: 10,
			zoom: 5.5,
		};
		console.log('props are', props);
		console.log('current context is', this.state.context);
	}
	componentDidMount(){
		console.log('componentDidMount');
		// Subscribe to featureId events.
		this.state.context && this.state.context.subscribe(this, this.onChange);
	}
	onChange(context: any, that: MultiviewMap) {

		// Update the state value for featureId.
		console.log('update the react map');
		if(context.geojsonUrl != null){
			fetch(context.geojsonUrl, {
				credentials: "same-origin"
			}).then((resp) => resp.json()).then((response) => {
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
	handleSubmit(featureId: number, geojsonUrl: string){
		console.log('changedfeatureId', featureId);
		console.log('changedGeojsonUrl', geojsonUrl);
		this.state.context.featureId = featureId;
		this.state.context.geojsonUrl = geojsonUrl;
	}
	reverseLongLat(coordinates: any, levels: number){
		return coordinates.map((subcoordinates: any) =>{
			if (levels > 1){
				return this.reverseLongLat(subcoordinates, levels -1);
			} else {
				return subcoordinates.reverse();
			}

		})	
	}
	features(){
		let result = this.state.geojson ? this.state.geojson.features: [];
		result = result.map((feature: any) => {
			console.log(feature);
			let coordinates = feature.geometry.coordinates;
			switch(feature.geometry.type){
				case 'Polygon':
					coordinates = this.reverseLongLat(coordinates, 2);
					break;
				case 'MultiPolygon':
					coordinates = this.reverseLongLat(coordinates, 3);
					break;
				default:
					console.log(feature);
			}
			feature.geometry.coordinates = coordinates;
			return feature;
		});
		return result;
	}
	polygonColor(feature: any){
		const selectedFeatureId = this.state.featureId;
		const externalId = feature.properties && feature.properties.external_id;
		return (
			(selectedFeatureId == feature.id) || // yes == is intended
			(selectedFeatureId == externalId)
		) ? 'red' : 'blue';
	}
	render() {
		const position: LatLngExpression = [this.state.lat, this.state.lng];
		console.log('render all');
		return (
			<div>
			<Map center={position} zoom={this.state.zoom}>
			<TileLayer
			attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
			/>
			{ this.features().map((feature: any, i: number)=> {
				return (
					<Polygon
					key={i}
					positions={feature.geometry.coordinates}
					color={this.polygonColor(feature)}>
					</Polygon >
				)
			})
			}
			</Map>
			<div id='feature-id'>
				<span><strong>Feature Id:</strong> {this.state.featureId}.</span>
			</div>
			{ this.state.featureId && this.state.geojsonUrl &&
				<DebugView
				featureId={this.state.featureId}
				geojsonUrl={this.state.geojsonUrl}
				handleSubmit={(featureId, geojsonUrl) => this.handleSubmit(featureId, geojsonUrl)}>
				</DebugView>
			}
			</div>
		);
	}
}

export default MultiviewMap;
