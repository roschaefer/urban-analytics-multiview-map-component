import React, { Component } from 'react';
import { render } from 'react-dom';
import { Map, TileLayer } from 'react-leaflet';
import Control from 'react-leaflet-control';
import { MultiviewMap } from './src/components/MultiviewMap';

export default class App extends Component {

    render() {

        return (
            <MultiviewMap>
            </MultiviewMap>
        );
    }
}

render(
    <App />,
    document.getElementById('mount')
);
