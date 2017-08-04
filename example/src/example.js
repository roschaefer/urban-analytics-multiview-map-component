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

ReactDOM.render(<App />, document.getElementById('app'));
