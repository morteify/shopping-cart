import {
	ADD_TO_CART,
	REMOVE_FROM_CART,
	UPDATE_TOTAL_COST,
	UPDATE_LOADED_ITEMS,
	SEARCH_ITEMS,
	UPDATE_SORTING_METHOD,
	UPDATE_FILTER_METHOD,
} from './constants';

export const addToCart = data => {
	return {
		type: ADD_TO_CART,
		data,
	};
};

export const removeFromCart = removeIndex => {
	return {
		type: REMOVE_FROM_CART,
		removeIndex,
	};
};

export const updateTotalCost = newTotalCost => {
	return {
		type: UPDATE_TOTAL_COST,
		newTotalCost,
	};
};

export const updateLoadedItems = items => {
	return {
		type: UPDATE_LOADED_ITEMS,
		items,
	};
};

export const searchItems = text => {
	return {
		type: SEARCH_ITEMS,
		text,
	};
};

export const updateSortingMethod = payload => {
	return {
		type: UPDATE_SORTING_METHOD,
		payload,
	};
};

export const updateFilterMethod = payload => {
	return {
		type: UPDATE_FILTER_METHOD,
		payload,
	};
};
