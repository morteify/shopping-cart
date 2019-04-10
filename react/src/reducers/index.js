import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import loadedItemsReducer from './loadedItemsReducer';

const rootReducer = combineReducers({
	data: dataReducer,
	loadedItems: loadedItemsReducer,
});

export default rootReducer;
