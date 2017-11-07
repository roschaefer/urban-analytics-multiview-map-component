import * as React from "react";
import { MapProps, Map, TileLayer, GeoJSON} from 'react-leaflet';
import * as Leaflet from 'leaflet';
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
  highlightedIds: number [];
  layerList: any [];
  focusId: number;
  zoom: number;
}

export class MultiviewMap extends React.Component<Props, State> {
  _map: Map;
  constructor(props: Props) {
    super(props);
    this.state = {
      controller: props.controller,
      geojsonUrl: null,
      geojson: null,
      highlightedIds: null,
      layerList: [],
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
      highlightedIds: data,
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
    this.state.controller.subscribe('mcv.select.focus', this.handleFocus);
    this.state.controller.subscribe('mcv.select.highlight', this.handleHighlight);
    this.state.controller.subscribe('mcv.reconfigure.geometry', this.handleGeometry);
    this.state.controller.subscribe('mcv.reconfigure.url', this.handleUrl);

    this._map.leafletElement.on('boxzoomend', (e:any)=>{
      const selectedlayers :any[] = this.state.layerList.filter((layer) => {
        return e.boxZoomBounds.intersects(layer.getBounds());
      });
      const selectedFeatures = selectedlayers.map((layer) => { return layer.feature.id });
      this.state.controller.publish('mcv.select.highlight', selectedFeatures);
    });
  }

  featureStyle(feature: any): Leaflet.PathOptions{
    const color = (this.state.highlightedIds.includes(feature.id)) ? 'red' : 'blue';
    return { color };
  }

  onEachFeature(feature:any, layer:any){
    this.state.layerList.push(layer);
    layer.on({
      click: () => {
        this.state.controller.publish('mcv.select.focus', feature.id);
        this.state.controller.publish('mcv.select.highlight', Array.of(feature.id));
      }
    });
  }

  position(): Leaflet.LatLngExpression {
    const focusedLayer = this.state.layerList.find((layer) => { return layer.feature.id === this.state.focusId });
    if (focusedLayer) {
      const center: Leaflet.LatLng = focusedLayer.getBounds().getCenter();
      return center;
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
        <Map ref={(m) => this._map= m} center={this.position()} zoom={this.state.zoom}>
        <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        { this.state.geojsonUrl && this.state.geojson &&
          <GeoJSON
            key={this.state.geojsonUrl}
            data={this.state.geojson}
            style={this.featureStyle}
            onEachFeature={this.onEachFeature}
          >
          </GeoJSON>
        }
        </Map>
      </div>
    );
  }
}

export default MultiviewMap;
