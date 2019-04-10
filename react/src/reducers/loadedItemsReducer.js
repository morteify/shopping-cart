import {
	UPDATE_LOADED_ITEMS,
	SEARCH_ITEMS,
	UPDATE_SORTING_METHOD,
	UPDATE_FILTER_METHOD,
} from '../actions/constants';

const initialState = {
	loadedItems: [],
	searchText: '',
	sortingCriteria: '',
	filterMethod: {},
};

const loadedItemsReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_LOADED_ITEMS:
			return {
				loadedItems: [...action.items],
			};
		case SEARCH_ITEMS:
			return {
				loadedItems: state.loadedItems,
				searchText: action.text.toLowerCase(),
			};
		case UPDATE_SORTING_METHOD:
			return {
				loadedItems: state.loadedItems,
				sortingCriteria: action.payload.sortingCriteria,
			};
		case UPDATE_FILTER_METHOD:
			if (
				state.filterMethod &&
				state.filterMethod[action.payload.filterCategory]
			) {
				if (
					state.filterMethod[action.payload.filterCategory].includes(
						action.payload.filterMethod
					)
				)
					return {
						loadedItems: state.loadedItems,
						filterMethod: {
							...state.filterMethod,
							[action.payload.filterCategory]: state.filterMethod[
								action.payload.filterCategory
							].filter(item => item !== action.payload.filterMethod),
						},
					};
				return {
					loadedItems: state.loadedItems,
					filterMethod: {
						...state.filterMethod,
						[action.payload.filterCategory]: [
							...state.filterMethod[action.payload.filterCategory],
							action.payload.filterMethod,
						],
					},
				};
			}
			return {
				loadedItems: state.loadedItems,
				filterMethod: {
					...state.filterMethod,
					[action.payload.filterCategory]: [action.payload.filterMethod],
				},
			};
		default:
			return state;
	}
};

export default loadedItemsReducer;
