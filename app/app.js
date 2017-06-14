//include main dependencies
var React = require('react');
var ReactDOM = require('react-dom');

//grab router property
var Router = require('react-router').Router

//grab routes
var routes = require('./config/routes');

//render contents according to route page

ReactDOM.render(
	<Router>{routes}</Router>,
	document.getElementById('app')
)