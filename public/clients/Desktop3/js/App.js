import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import Nav          from 'react-bootstrap/lib/Nav';
import Navbar       from 'react-bootstrap/lib/Navbar';
import NavBrand     from 'react-bootstrap/lib/NavBrand';
import NavItem      from 'react-bootstrap/lib/NavItem';
import MenuItem     from 'react-bootstrap/lib/MenuItem';
import NavDropdown  from 'react-bootstrap/lib/Navdropdown';
import Dispatcher   from '../js/appDispatcher.js';

require("../css/style.scss");



import LoginHandler from './components/Login.js';

let App = React.createClass({
    render() {
        return (
            <div>
                <Navbar>
                    <NavBrand>Desktop 3 (React JS)</NavBrand>
                    <Nav>
                        <NavItem href="#">Home</NavItem>
                        <NavItem href="#login">Login</NavItem>
                        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                            <MenuItem eventKey="1">Action</MenuItem>
                            <MenuItem eventKey="2">Another action</MenuItem>
                            <MenuItem eventKey="3">Something else here</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey="4">Separated link</MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar>
                <RouteHandler/>
            </div>
        );
    }
});

let routes = (
    <Route name="app" path="/" handler={App}>
        <Route name="login" path="/login" handler={LoginHandler}/>
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.body);
});