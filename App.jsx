import React from 'react';
import ReactDom from 'react-dom';
import { MultiviewMap } from './src/components/MultiviewMap';
import { MultiviewState } from "./src/MultiviewState";

let multiviewState = new MultiviewState();



const props: MultiviewMapProps = {
    context: multiviewState,
    geojsonUrl: '',
    geojson: null,
    color: 'red',
    featureId: null,
    lat: 50,
    lng: 50,
    zoom: 4
}
ReactDom.render(
    <MultiviewMap context={multiviewState}/>,
    document.getElementById('mount')
);

setTimeout(function() {
	multiviewState.featureId = 1;
	multiviewState.geojsonUrl = 'data/bundeslaender.geojson';
}, 1000);
