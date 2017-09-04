import * as React from "react";
import * as ReactDOM from "react-dom";
import { MultiviewMap, MultiviewState } from 'urban-analytics-multiview-map-component';

let multiviewState = new MultiviewState();


ReactDOM.render(
  <MultiviewMap context={multiviewState} lat={null} lng={null} zoom={5}/>,
  document.getElementById('multiview-map-component')
);

setTimeout(function() {
  multiviewState.featureId = 1;
  multiviewState.geojsonUrl = 'data/bundeslaender.geojson';
}, 1000);
