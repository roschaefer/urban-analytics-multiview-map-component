'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var DebugViewComponent = (function (_React$Component) {
	_inherits(DebugViewComponent, _React$Component);

	function DebugViewComponent(props) {
		_classCallCheck(this, DebugViewComponent);

		_get(Object.getPrototypeOf(DebugViewComponent.prototype), 'constructor', this).call(this, props);
		this.state = {
			featureId: props.featureId,
			geojsonUrl: props.geojsonUrl,
			handleSubmit: props.handleSubmit
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	_createClass(DebugViewComponent, [{
		key: 'handleInputChange',
		value: function handleInputChange(event) {
			var target = event.target;
			var value = target.type === 'checkbox' ? target.checked : target.value;
			var name = target.name;

			this.setState(_defineProperty({}, name, value));
		}
	}, {
		key: 'handleSubmit',
		value: function handleSubmit(event) {
			console.log('A featureId was submitted: ', this.state.featureId);
			console.log('A geojsonUrl was submitted: ', this.state.geojsonUrl);
			this.state.handleSubmit(this.state.featureId, this.state.geojsonUrl);
			event.preventDefault();
		}
	}, {
		key: 'render',
		value: function render() {
			console.log('rendering the debug view');
			return _react2['default'].createElement(
				'form',
				{ onSubmit: this.handleSubmit },
				_react2['default'].createElement(
					'label',
					null,
					'FeatureId:',
					_react2['default'].createElement('input', {
						type: 'text',
						name: 'featureId',
						value: this.state.featureId,
						onChange: this.handleInputChange })
				),
				_react2['default'].createElement(
					'label',
					null,
					'GeoJsonURL:',
					_react2['default'].createElement('input', {
						type: 'text',
						name: 'geojsonUrl',
						value: this.state.geojsonUrl,
						onChange: this.handleInputChange })
				),
				_react2['default'].createElement('input', { type: 'submit', value: 'Submit' })
			);
		}
	}]);

	return DebugViewComponent;
})(_react2['default'].Component);

exports.DebugViewComponent = DebugViewComponent;