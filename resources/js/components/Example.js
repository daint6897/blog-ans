import React, { Component } from 'react';
import ReactDOM from 'react-dom';
class Example extends Component {
    render() {
        return (
        <div>
            <h1>Welcome to Home!</h1>
        </div>)
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<Example /> , document.getElementById('example'));
}

export default Example;


// import React, { Component } from 'react';

