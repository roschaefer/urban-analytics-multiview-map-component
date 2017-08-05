require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var MultiviewMapComponent = require('urban-analytics-multiview-map-component');

var App = React.createClass({
  displayName: 'App',

  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(MultiviewMapComponent, null)
    );
  }
});

var PublisherSubscriberManager = {
  subscribers: [],
  subscribe: function subscribe(parent, callback) {
    this.subscribers.push({ parent: parent, callback: callback });
  },
  featureId: function featureId(name) {
    // Notify subscribers of event.
    this.subscribers.forEach(function (subscriber) {
      subscriber.callback(name, subscriber.parent);
    });
  }
};

ReactDOM.render(React.createElement(MultiviewMapComponent, { context: PublisherSubscriberManager }), document.getElementById('map-component'));

document.addEventListener("DOMContentLoaded", function (event) {
  setTimeout(function () {
    PublisherSubscriberManager.featureId('I am a featureId');
  }, 0);
  // Change the box featureId every few seconds.
});

},{"react":undefined,"react-dom":undefined,"urban-analytics-multiview-map-component":undefined}]},{},[1]);
