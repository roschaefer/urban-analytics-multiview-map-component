import * as React from "react";
import { MapProps, Map, TileLayer, GeoJSON} from 'react-leaflet';
import * as Leaflet from 'leaflet';
import * as DebugView from './DebugView';
import { MultiviewState } from '../MultiviewState';

export interface  Props {
  context: any;
  lat: number;
  lng: number;
  zoom: number;
}
export interface  State {
  context: any;
  geojsonUrl: string;
  geojson: any;
  featureId: number;
  lat: number;
  lng: number;
  zoom: number;
}
export class MultiviewMap extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      context: props.context,
      geojsonUrl: null,
      geojson: null,
      featureId: null,
      lat: props.lat || 51.3,
      lng: props.lng || 10,
      zoom: props.zoom || 5.5,
    };
    this.featureStyle = this.featureStyle.bind(this);
    this.onEachFeature = this.onEachFeature.bind(this);
  }
  componentDidMount(){
    this.state.context && this.state.context.subscribe(this, this.handleMultiviewStateChange);
  }
  handleMultiviewStateChange(context: MultiviewState, that: MultiviewMap) {
    that.setState({
      featureId: context.featureId,
      geojsonUrl: context.geojsonUrl,
      geojson: context.geojson,
    });
  }
  handleSubmit(formData: DebugView.FormData){
    this.state.context.featureId = formData.featureId;
    this.state.context.geojsonUrl = formData.geojsonUrl;
  }
  featureStyle(feature: any): Leaflet.PathOptions{
    const color = (feature.id === this.state.featureId) ? 'red' : 'blue';
    return { color };
  }
  onEachFeature(feature:any, layer:any){
    layer.on({
      click: () => {
        this.state.context.featureId = feature.id;
      },
      mouseover: () => {
        this.state.context.featureId = feature.id;
      }
    })
  }
  render() {
    const position: Leaflet.LatLngExpression = [this.state.lat, this.state.lng];
    return (
      <div className="multiview-map-component">
        <Map center={position} zoom={this.state.zoom}>
        <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        { this.state.geojson &&  this.state.geojsonUrl &&
          <GeoJSON
            key={this.state.geojsonUrl}
            data={this.state.geojson}
            style={this.featureStyle}
            onEachFeature={this.onEachFeature}
          >
          </GeoJSON>
        }
        </Map>

        <DebugView.DebugView
        featureId={Number(this.state.featureId)}
        geojsonUrl={String(this.state.geojsonUrl)}
        onSubmit={(formData: DebugView.FormData) => this.handleSubmit(formData)}>
        </DebugView.DebugView>
      </div>
    );
  }
}

export default MultiviewMap;
