import * as React from "react";
import { MapProps, Map, TileLayer, GeoJSON} from 'react-leaflet';
import * as Leaflet from 'leaflet';
import * as geojson from 'geojson';
import { MultiviewCoordinator } from '../MultiviewCoordinator';
const SelectArea = require('leaflet-area-select');
const MiniMap = require('leaflet-minimap');

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

export class MapComponent extends React.Component<Props, State> {
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
    this.pointToLayer = this.pointToLayer.bind(this);
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
    this._map.leafletElement.fitBounds(this.bounds());
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

  pointToLayer(geoJsonPoint:any, latlng: Leaflet.LatLng){
    return new Leaflet.CircleMarker(latlng);
  }

  layerToBounds(layer: any): Leaflet.LatLngBounds{
    switch(layer.feature.geometry.type){
      case "Point":
        return new Leaflet.LatLngBounds(layer.getLatLng(), layer.getLatLng());
      default:
        return layer.getBounds();
    }
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
        return e.bounds.intersects(this.layerToBounds(layer));
      });
      const selectedFeatureIds = selectedLayers.map((layer) => { return Number(layer.feature.id) });
      this.state.controller.publish('mcv.select.focus', selectedFeatureIds);
    })

    const osmUrl ='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
    const osmAttrib ='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    let layer = new Leaflet.TileLayer(osmUrl, {minZoom: 0, maxZoom: 13, attribution: osmAttrib});
    new MiniMap(layer).addTo(this._map.leafletElement);
  }

  featureStyle(feature: geojson.Feature<geojson.GeometryObject>): Leaflet.PathOptions{
    const fillColor = (this.state.focusedIds.includes(Number(feature.id))) ? 'red' : 'blue';
    let color = fillColor;
    let weight = 2;
    let dashArray = '3';
    if (this.state.highlightedIds.includes(Number(feature.id))) {
      weight = 4;
      color = 'white';
      dashArray = '';
    }
    return { color, weight, fillColor, dashArray };
  }

  onEachFeature(feature: geojson.Feature<geojson.GeometryObject>, layer: Leaflet.Path){
    this.state.layerList.push(layer);
    layer.on({
      mouseover: () => {
        layer.bringToFront();
        this.state.controller.publish('mcv.select.highlight', [Number(feature.id)]);
      },
      click: (event: Leaflet.LeafletMouseEvent) => {
        if(event.originalEvent.ctrlKey){
          this.state.controller.publish('mcv.select.focus', this.xor(this.state.focusedIds, Number(feature.id)));
        } else {
          this.state.controller.publish('mcv.select.focus', [Number(feature.id)]);
        }
      }
    });
  }

  xor(focusedIds: number[], featureId: number){
    let focusedIdsSet: Set<Number> = new Set(focusedIds);
    if(!focusedIdsSet.delete(featureId)) { focusedIdsSet.add(featureId) };
    return Array.from(focusedIdsSet);
  }

  bounds(): Leaflet.LatLngBounds {
    let focusedLayers = this.state.layerList.filter((layer) => {
      return this.state.focusedIds.includes(Number(layer.feature.id))
    });
    if (focusedLayers.length > 0) {
      let bounds: Leaflet.LatLngBounds[] = focusedLayers.map((layer) => {
        return this.layerToBounds(layer)
      });
      let result: Leaflet.LatLngBounds = bounds.reduce((result: Leaflet.LatLngBounds, bounds: Leaflet.LatLngBounds) => {
        return result.extend(bounds);
      }, bounds[0]);
      return result;
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
            pointToLayer={this.pointToLayer}
            onEachFeature={this.onEachFeature}
          >
          </GeoJSON>
        }
        </Map>
      </div>
    );
  }
}

export default MapComponent;
