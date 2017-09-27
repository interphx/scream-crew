import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { getRandomId } from 'shared/utils';

class App extends React.Component<{}, {}> {
    render() {
        return <div className="app">

        </div>;
    }
}

var root = document.getElementById('react-container');
ReactDOM.render(<App />, root);