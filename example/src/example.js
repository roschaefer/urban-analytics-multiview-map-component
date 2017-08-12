var React = require('react');
var ReactDOM = require('react-dom');
var MultiviewMapComponent = require('urban-analytics-multiview-map-component');
import PublisherSubscriberManager from './PublisherSubscriberManager';

var App = React.createClass({
	render () {
		return (
			<div>
				<MultiviewMapComponent />
			</div>
		);
	}
});

var psm = new PublisherSubscriberManager();
psm.featureId = 42;

fetch('berlin.json').then((resp) => resp.json()).then((response) => {
  console.log(response);
  psm.geometry = response;
}).catch((err) => {
  console.log(err);
});

ReactDOM.render(React.createElement(MultiviewMapComponent, { context: psm }), document.getElementById('map-component'));

