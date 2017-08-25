import * as React from "react";
import { MapProps, Map, TileLayer, GeoJSON} from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import * as DebugView from './DebugView';
import { MultiviewState } from '../MultiviewState';

export interface  Props {
  context: any;
}
export interface  State {
  context: any;
  geojsonUrl: string;
  geojson: any;
  color: string;
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
      color: 'red',
      featureId: null,
      lat: 51.3,
      lng: 10,
      zoom: 5.5,
    };
  }
  componentDidMount(){
    this.state.context && this.state.context.subscribe(this, this.handleMultiviewStateChange);
  }
  handleMultiviewStateChange(context: MultiviewState, that: MultiviewMap) {
    let state: State = { ...this.state}
    state.featureId = context.featureId;
    state.geojsonUrl = context.geojsonUrl;

    if(context.geojsonUrl != null){
      fetch(context.geojsonUrl, {
        credentials: "same-origin"
      }).then((resp) => resp.json()).then((response) => {
        state.geojson = response;
      }).catch((err) => {
        console.log(err);
      }).then(()=>{
        that.setState(state);
      });
    } else {
      that.setState(state);
    }
  }
  handleSubmit(formData: DebugView.FormData){
    this.state.context.featureId = formData.featureId;
    this.state.context.geojsonUrl = formData.geojsonUrl;
  }
  polygonColor(feature: any){
    return (this.state.featureId == feature.id) ? 'red' : 'blue';
  }
  render() {
    const position: LatLngExpression = [this.state.lat, this.state.lng];
    return (
      <div className="multiview-map-component">
        <Map center={position} zoom={this.state.zoom}>
        <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        { this.state.geojson && 
          <GeoJSON data={this.state.geojson}>
          </GeoJSON>
        }
        </Map>

      <DebugView.DebugView
      featureId={Number(this.state.featureId)}
      geojsonUrl={String(this.state.geojsonUrl)}
      handleSubmit={(formData: DebugView.FormData) => this.handleSubmit(formData)}>
      </DebugView.DebugView>
      </div>
    );
  }
}

export default MultiviewMap;
