import * as React from "react";
import * as ReactDOM from "react-dom";
import { MultiviewMap } from 'urban-analytics-multiview-map-component';
import { MultiviewState } from "./MultiviewState";

let multiviewState = new MultiviewState();


ReactDOM.render(
    <MultiviewMap context={multiviewState}/>,
    document.getElementById('multiview-map-component')
);

setTimeout(function() {
	multiviewState.featureId = 1;
	multiviewState.geojsonUrl = 'data/bundeslaender.geojson';
}, 1000);
