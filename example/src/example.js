var React = require('react');
var ReactDOM = require('react-dom');
import Observable from './Observable';
var MultiviewMapComponent = require('urban-analytics-multiview-map-component');

var App = React.createClass({
	render () {
		return (
			<div>
				<MultiviewMapComponent />
			</div>
		);
	}
});

var observable = new Observable();


ReactDOM.render(React.createElement(MultiviewMapComponent, { context: observable }), document.getElementById('map-component'));
setTimeout(function() {
	observable.featureId = 42;
	observable.geojsonUrl = 'berlin.json';
}, 1000);

