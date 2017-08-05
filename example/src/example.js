var React = require('react');
var ReactDOM = require('react-dom');
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

var PublisherSubscriberManager = {
  subscribers: [],
  subscribe: function(parent, callback) {
    this.subscribers.push({ parent: parent, callback: callback });
  },
  featureId: function(name) {
    // Notify subscribers of event.
    this.subscribers.forEach(function(subscriber) {
      subscriber.callback(name, subscriber.parent);
    });
  }
};

ReactDOM.render(React.createElement(MultiviewMapComponent, { context: PublisherSubscriberManager }), document.getElementById('map-component'));

document.addEventListener("DOMContentLoaded", function(event) {
  setTimeout(function() {
    PublisherSubscriberManager.featureId('I am a featureId');
  }, 0);
  // Change the box featureId every few seconds.
});

