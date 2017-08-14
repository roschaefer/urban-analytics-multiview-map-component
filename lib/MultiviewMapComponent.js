'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactLeaflet = require('react-leaflet');

var _DebugViewComponentJs = require('./DebugViewComponent.js');

var MultiviewMapComponent = (function (_Component) {
	_inherits(MultiviewMapComponent, _Component);

	function MultiviewMapComponent(props) {
		_classCallCheck(this, MultiviewMapComponent);

		_get(Object.getPrototypeOf(MultiviewMapComponent.prototype), 'constructor', this).call(this, props);
		this.state = {
			context: props.context,
			geojsonUrl: null,
			geojson: null,
			color: 'red',
			featureId: '',
			lat: 51.3,
			lng: 10,
			zoom: 5.5
		};
		// Subscribe to featureId events.
		this.state.context.subscribe(this, this.onChange);
	}

	_createClass(MultiviewMapComponent, [{
		key: 'onChange',
		value: function onChange(context, that) {

			// Update the state value for featureId.
			console.log('update the react map');
			if (context.geojsonUrl != null) {
				fetch(context.geojsonUrl, {
					credentials: "same-origin"
				}).then(function (resp) {
					return resp.json();
				}).then(function (response) {
					that.setState({
						featureId: context.featureId,
						geojsonUrl: context.geojsonUrl,
						geojson: response
					});
				})['catch'](function (err) {
					console.log(err);
				});
			}
		}
	}, {
		key: 'handleSubmit',
		value: function handleSubmit(featureId, geojsonUrl) {
			console.log('changedfeatureId', featureId);
			console.log('changedGeojsonUrl', geojsonUrl);
			this.state.context.featureId = featureId;
			this.state.context.geojsonUrl = geojsonUrl;
		}
	}, {
		key: 'reverseLongLat',
		value: function reverseLongLat(coordinates, levels) {
			var _this = this;

			return coordinates.map(function (subcoordinates) {
				if (levels > 1) {
					return _this.reverseLongLat(subcoordinates, levels - 1);
				} else {
					return subcoordinates.reverse();
				}
			});
		}
	}, {
		key: 'features',
		value: function features() {
			var _this2 = this;

			var result = this.state.geojson ? this.state.geojson.features : [];
			result = result.map(function (feature) {
				console.log(feature);
				var coordinates = feature.geometry.coordinates;
				switch (feature.geometry.type) {
					case 'Polygon':
						coordinates = _this2.reverseLongLat(coordinates, 2);
						break;
					case 'MultiPolygon':
						coordinates = _this2.reverseLongLat(coordinates, 3);
						break;
					default:
						console.log(feature);
				}
				feature.geometry.coordinates = coordinates;
				return feature;
			});
			return result;
		}
	}, {
		key: 'polygonColor',
		value: function polygonColor(feature) {
			var selectedFeatureId = this.state.featureId;
			var externalId = feature.properties && feature.properties.external_id;
			return selectedFeatureId == feature.id || // yes == is intended
			selectedFeatureId == externalId ? 'red' : 'blue';
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var position = [this.state.lat, this.state.lng];
			console.log('render all');
			return _react2['default'].createElement(
				'div',
				null,
				_react2['default'].createElement(
					_reactLeaflet.Map,
					{ center: position, zoom: this.state.zoom },
					_react2['default'].createElement(_reactLeaflet.TileLayer, {
						attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
						url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
					}),
					this.features().map(function (feature, i) {
						return _react2['default'].createElement(_reactLeaflet.Polygon, {
							key: i,
							positions: feature.geometry.coordinates,
							color: _this3.polygonColor(feature) });
					}),
					_react2['default'].createElement(
						_reactLeaflet.Marker,
						{ position: position },
						_react2['default'].createElement(
							_reactLeaflet.Popup,
							null,
							_react2['default'].createElement(
								'span',
								null,
								_react2['default'].createElement(
									'strong',
									null,
									'Feature Id:'
								),
								' ',
								this.state.featureId,
								'.'
							)
						)
					)
				),
				this.state.featureId && this.state.geojsonUrl && _react2['default'].createElement(_DebugViewComponentJs.DebugViewComponent, {
					featureId: this.state.featureId,
					geojsonUrl: this.state.geojsonUrl,
					handleSubmit: function (featureId, geojsonUrl) {
						return _this3.handleSubmit(featureId, geojsonUrl);
					} })
			);
		}
	}]);

	return MultiviewMapComponent;
})(_react.Component);

exports['default'] = MultiviewMapComponent;
module.exports = exports['default'];