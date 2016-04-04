/*
var $ = require('jquery');
$('body').html('hello');
*/

/*
import $ from 'jquery';
$('body').html('Hello');
*/

/*
import Button from './Components/Button';
const button = new Button('google.com');
button.render('a');
*/

// Code splitting
// webpack --display-modules --display-chunks
/*
if (document.querySelectorAll('a').length) {
    require.ensure([], () => {
        const Button = require('./Components/Button').default;
        const button = new Button('google.com');

        button.render('a');
    });
}
*/

import './styles1.scss';

// Would generate button.bundle.js instead of 1.bundle.js:
require.ensure([], () => {
    const Button = require('./Components/Button').default;
    const button = new Button('google.com');

    button.render('a');
}, 'button');

// Adding a second component
// If we have a title, render the Header component on it
if (document.querySelectorAll('h1').length) {
    require.ensure([], () => {
        const Header = require('./Components/Header').default;
        new Header().render('h1');
    }, 'header');
}
