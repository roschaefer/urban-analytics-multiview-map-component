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
  focusId: number;
  position: Leaflet.LatLngExpression;
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
      focusId: null,
      position: [51.3, 10],
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
    layer.on({
      mouseover: () => {
        this.state.context.featureId = feature.id;
      },
      click: () => {
        let polygon: Leaflet.Polygon = new Leaflet.Polygon(feature.geometry.coordinates);
        const center: Leaflet.LatLng = polygon.getBounds().getCenter();
        const reversedPosition = {
          lat: center.lng,
          lng: center.lat
        }
        this.setState({
          position: reversedPosition
        });
        // yes, lat/lng is reversed (GeoJSON spec)
        this.state.context.featureId = feature.id;
        this.state.context.focusId   = feature.id;
      }
    });
  }
  render() {
    return (
      <div className="multiview-map-component">
        <Map center={this.state.position} zoom={this.state.zoom}>
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
