import * as React from "react";
import { MapProps, Map, TileLayer, GeoJSON} from 'react-leaflet';
import * as Leaflet from 'leaflet';
import * as DebugView from './DebugView';
import { MultiviewState } from '../MultiviewState';

export interface  Props {
  context: any;
  lat?: number;
  lng?: number;
  zoom?: number;
  events?: string [];
}
export interface  State {
  context: any;
  geojsonUrl: string;
  geojson: any;
  featureId: number;
  featureList: any [];
  focusId: number;
  zoom: number;
  events: string [];
}
export class MultiviewMap extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      context: props.context,
      geojsonUrl: null,
      geojson: null,
      featureId: null,
      featureList: [],
      focusId: null,
      zoom: props.zoom || 5.5,
      events: props.events || ['click', 'mouseover']
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
      focusId: context.focusId,
    });
  }
  handleSubmit(formData: DebugView.FormData){
    this.state.context.featureId = formData.featureId;
    this.state.context.geojsonUrl = formData.geojsonUrl;
    this.state.context.focusId= formData.focusId;
  }
  featureStyle(feature: any): Leaflet.PathOptions{
    const color = (feature.id === this.state.featureId) ? 'red' : 'blue';
    return { color };
  }
  onEachFeature(feature:any, layer:any){
    this.state.featureList.push(feature);
    layer.on({
      mouseover: () => {
        this.state.context.featureId = feature.id;
      },
      click: () => {
        // yes, lat/lng is reversed (GeoJSON spec)
        this.state.context.featureId = feature.id;
        this.state.context.focusId   = feature.id;
      }
    });
  }
  position(): Leaflet.LatLngExpression {
    const focusedFeature = this.state.featureList.find((feature) => { return feature.id === this.state.focusId });
    if (focusedFeature) {
      let polygon: Leaflet.Polygon = new Leaflet.Polygon(focusedFeature.geometry.coordinates);
      const center: Leaflet.LatLng = polygon.getBounds().getCenter();
      return {
        lat: center.lng,
        lng: center.lat
      }
    } else {
      return {
        lat: 51.3,
        lng: 10
      }
    }
  }
  render() {
    return (
      <div className="multiview-map-component">
        <Map center={this.position()} zoom={this.state.zoom}>
        <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        { this.state.geojson &&
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
        focusId={this.state.focusId}
        geojsonUrl={String(this.state.geojsonUrl)}
        onSubmit={(formData: DebugView.FormData) => this.handleSubmit(formData)}>
        </DebugView.DebugView>
      </div>
    );
  }
}

export default MultiviewMap;
