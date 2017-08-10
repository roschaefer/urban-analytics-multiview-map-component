var React = require('react');
var ReactDOM = require('react-dom');
var MultiviewMapComponent = require('urban-analytics-multiview-map-component');
var geojson = require('../data/berlin.json');

var App = React.createClass({
	render () {
		return (
			<div>
				<MultiviewMapComponent />
			</div>
		);
	}
});

var PublisherSubscriberManager = {
  subscribers: [],
  featureId: 42,
  geometry: geojson,
  subscribe: function(parent, callback) {
    this.subscribers.push({ parent: parent, callback: callback });
  },
  notify: function() {
    var that = this;
    // Notify subscribers of event.
    this.subscribers.forEach(function(subscriber) {
      subscriber.callback(that, subscriber.parent);
    });
  }
};

ReactDOM.render(React.createElement(MultiviewMapComponent, { context: PublisherSubscriberManager }), document.getElementById('map-component'));

document.addEventListener("DOMContentLoaded", function(event) {
  setTimeout(function() {
    PublisherSubscriberManager.notify();
  }, 0);
  // Change the box featureId every few seconds.
});

