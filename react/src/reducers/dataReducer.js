import {
	ADD_TO_CART,
	REMOVE_FROM_CART,
	UPDATE_TOTAL_COST,
} from '../actions/constants';

const initialState = {
	saved: [],
	totalCost: 0,
};

const storeProducts = (state = initialState, action) => {
	switch (action.type) {
		case ADD_TO_CART:
			return { saved: [...state.saved, action.data] };
		case REMOVE_FROM_CART:
			return {
				saved: state.saved.filter(
					(item, index) => index !== action.removeIndex
				),
			};
		case UPDATE_TOTAL_COST:
			return Object.assign({}, state, {
				totalCost: action.newTotalCost,
			});
		default:
			return state;
	}
};

export default storeProducts;
