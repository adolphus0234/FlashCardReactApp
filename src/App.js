import React, { Component } from 'react';
import ViewCards from './components/ViewCard/ViewCards';
import './App.css';

class App extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="App">
                <div className="inner-body">
                    <ViewCards flashCardCollection={[1, 1]}/>
                </div>
            </div>
        );
    }
}

export default App;
