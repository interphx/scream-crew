import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { getRandomId } from 'shared/utils';

import { createStateContainer } from 'client/store';

class App extends React.Component<{}, {}> {
    render() {
        return <div className="app">

        </div>;
    }
}

function main() {
    var store = createStateContainer();

    (window as any).store = store;

    var root = document.getElementById('react-container');
    ReactDOM.render(<App />, root);
}

main();
