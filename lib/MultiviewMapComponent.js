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

var MultiviewMapComponent = (function (_Component) {
  _inherits(MultiviewMapComponent, _Component);

  function MultiviewMapComponent(props) {
    _classCallCheck(this, MultiviewMapComponent);

    _get(Object.getPrototypeOf(MultiviewMapComponent.prototype), 'constructor', this).call(this, props);
    this.state = {
      context: props.context,
      featureId: '',
      lat: 51.3,
      lng: 10,
      zoom: 5.5
    };
    // Subscribe to featureId events.
    this.state.context.subscribe(this, this.onFeatureId);
  }

  _createClass(MultiviewMapComponent, [{
    key: 'onFeatureId',
    value: function onFeatureId(featureId, that) {
      // Update the state value for featureId.
      that.setState({ featureId: featureId });
    }
  }, {
    key: 'render',
    value: function render() {
      var position = [this.state.lat, this.state.lng];
      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          'span',
          null,
          'Selected feature ID: ',
          _react2['default'].createElement(
            'strong',
            null,
            this.state.featureId
          )
        ),
        _react2['default'].createElement(
          _reactLeaflet.Map,
          { center: position, zoom: this.state.zoom },
          _react2['default'].createElement(_reactLeaflet.TileLayer, {
            attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          })
        )
      );
    }
  }]);

  return MultiviewMapComponent;
})(_react.Component);

exports['default'] = MultiviewMapComponent;
module.exports = exports['default'];