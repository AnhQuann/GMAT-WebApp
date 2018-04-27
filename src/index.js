import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import { BrowserRouter, Switch, Route, Link, withRouter } from 'react-router-dom';

import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import reducers from './reducers';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

class CompA extends Component {
    render() {
        return (
            <div>ComA</div>
        )
    }
}

class CompB extends Component {
    render() {
        return (
            <div>ComB</div>
        )
    }
}
class MyLink extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.history.push('/b');
    }

    render() {
        return (
            <div onClick={this.onClick}>Click to change to B</div>
        )
    }
}

const MyLinkWithRouter = withRouter(MyLink);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <div>
                <Link to='/a'>a</Link>
                <Link to='/b'>b</Link>
                <MyLinkWithRouter/>
                <Switch>
                    <Route path='/a' component={CompA} />
                    <Route path='/b' component={CompB} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();