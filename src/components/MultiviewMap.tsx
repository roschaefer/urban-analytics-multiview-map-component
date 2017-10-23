import * as React from "react";
import { MapProps, Map, TileLayer, GeoJSON} from 'react-leaflet';
import * as Leaflet from 'leaflet';
import * as DebugView from './DebugView';
import { MultiviewController } from '../MultiviewController';

export interface  Props {
  controller: any;
  lat?: number;
  lng?: number;
  zoom?: number;
}

export interface  State {
  controller: any;
  geojsonUrl: string;
  geojson: any;
  featureId: number;
  featureList: any [];
  focusId: number;
  zoom: number;
}

export class MultiviewMap extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      controller: props.controller,
      geojsonUrl: null,
      geojson: null,
      featureId: null,
      featureList: [],
      focusId: null,
      zoom: props.zoom || 5.5,
    };
    this.featureStyle = this.featureStyle.bind(this);
    this.onEachFeature = this.onEachFeature.bind(this);

    this.handleHighlight= this.handleHighlight.bind(this);
    this.handleFocus= this.handleFocus.bind(this);
    this.handleUrl= this.handleUrl.bind(this);
    this.handleGeometry= this.handleGeometry.bind(this);
  }

  handleHighlight(msg:string, data:any) {
    this.setState({
      featureId: data,
    });
  }

  handleFocus(msg:string, data:any) {
    this.setState({
      focusId: data,
    });
  }

  handleUrl(msg:string, data:any) {
    this.setState({
      geojsonUrl: data,
    });
  }

  handleGeometry(msg:string, data:any) {
    this.setState({
      geojson: data,
    });
  }

  componentDidMount(){
   // this.state.controller && this.state.controller.subscribe(this, this.handleMultiviewControllerChange);
    if(this.state.controller) {
      this.state.controller.subscribe('select focus', this.handleFocus);
      this.state.controller.subscribe('select highlight', this.handleHighlight);
      this.state.controller.subscribe('reconfigure geometry', this.handleGeometry);
      this.state.controller.subscribe('reconfigure url', this.handleUrl);
    }
  }

  handleSubmit(formData: DebugView.FormData){
    this.state.controller.publish('select highlight', formData.featureId);
    this.state.controller.publish('select focus', formData.focusId);
    this.state.controller.publish('reconfigure url', formData.geojsonUrl);
  }

  featureStyle(feature: any): Leaflet.PathOptions{
    const color = (feature.id === this.state.featureId) ? 'red' : 'blue';
    return { color };
  }

  onEachFeature(feature:any, layer:any){
    this.state.featureList.push(feature);
    layer.on({
      mouseover: () => {
        this.state.controller.publish('select highlight', feature.id);
      },
      click: () => {
        this.state.controller.publish('select focus', feature.id);
        this.state.controller.publish('select highlight', feature.id);
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
        { this.state.geojson && this.state.geojsonUrl &&
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
