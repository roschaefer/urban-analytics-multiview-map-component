import * as React from "react";
import { MapProps, Map, TileLayer, GeoJSON} from 'react-leaflet';
import * as Leaflet from 'leaflet';
import { MultiviewController } from '../MultiviewController';
const SelectArea = require('leaflet-area-select');
const Color = require('color');

export interface  Props {
  controller: any;
}

export interface  State {
  controller: any;
  geojsonUrl?: string;
  geojson?: any;
  highlightedIds?: number [];
  focusedIds?: number [];
  layerList: any [];
}

export class MultiviewMap extends React.Component<Props, State> {
  _map: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      controller: props.controller,
      layerList: [],
      focusedIds: [],
      highlightedIds: [],
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
      focusedIds: data,
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

    this._map.leafletElement.selectArea.enable();
    this._map.leafletElement.selectArea.setShiftKey(true);
    this._map.leafletElement.on('areaselected', (e:any)=>{
      const selectedLayers:any[] = this.state.layerList.filter((layer) => {
        return e.bounds.intersects(layer.getBounds());
      });
      const selectedFeatureIds = selectedLayers.map((layer) => { return layer.feature.id });
      this.state.controller.publish('mcv.select.focus', selectedFeatureIds);
    })
  }

  featureStyle(feature: any): Leaflet.PathOptions{
    let color = (this.state.focusedIds.includes(feature.id)) ? Color('red') : Color('blue');
    if (this.state.highlightedIds.includes(feature.id)) {
      color = color.lighten(0.5);
    }
    return { color };
  }

  onEachFeature(feature:any, layer:any){
    this.state.layerList.push(layer);
    layer.on({
      mouseover: () => {
        this.state.controller.publish('mcv.select.highlight', Array.of(layer.feature.id));
      },
      click: () => {
        this.state.controller.publish('mcv.select.focus', Array.of(layer.feature.id));
      }
    });
  }

  bounds(): Leaflet.LatLngBounds {
    const focusedLayers = this.state.layerList.filter((layer) => { return this.state.focusedIds.includes(layer.feature.id) });
    if (focusedLayers.length > 0) {
      const bounds: Leaflet.LatLngBounds = focusedLayers.reduce((result, layer) => {
        return result.extend(layer.getBounds());
      }, focusedLayers[0].getBounds());
      return bounds;
    } else {
      return new Leaflet.LatLngBounds({
        lat: 55.05652618408226,
        lng: 15.03811264038086
      }, {
        lat: 47.26990127563505,
        lng: 5.87161922454851
      });
    }
  }

  render() {
    return (
      <div className="multiview-map-component">
        <Map ref={(m) => this._map= m} bounds={this.bounds()}>
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
