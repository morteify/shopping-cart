import React, { Component } from 'react';
import './App.css';
import { Container } from 'reactstrap';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Shelf from './components/Shelf';
import NavigationBar from './components/NavigationBar';
import ShoppingCart from './components/ShoppingCart';
import Error from './components/Error';
import reducer from './reducers/index';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();

const store = createStore(
	reducer,
	persistedState,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
	saveState(store.getState());
});

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Provider store={store}>
					<div className="App">
						<NavigationBar />
						<Switch>
							<Route exact path="/" component={Shelf} />
							<Route path="/mycart" component={ShoppingCart} />
							<Route component={Error} />
						</Switch>
					</div>
				</Provider>
			</BrowserRouter>
		);
	}
}

export default App;
