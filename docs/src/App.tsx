import * as React from "react";
import * as ReactDOM from "react-dom";
import { MultiviewMap, MultiviewBroadcaster } from 'urban-analytics-multiview-map-component';

let multiviewState = new MultiviewBroadcaster();


ReactDOM.render(
  <MultiviewMap context={multiviewState} lat={undefined} lng={undefined} zoom={5}/>,
  document.getElementById('multiview-map-component')
);

setTimeout(function() {
  multiviewState.featureId = 1;
  multiviewState.geojsonUrl = 'data/bundeslaender.geojson';
}, 1000);
