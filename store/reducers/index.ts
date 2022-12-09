import { combineReducers } from 'redux'

import productsReducer from './products'
import cartReducer from './cart'
import filtersReducer from './filters'

import {HYDRATE} from 'next-redux-wrapper';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  filters: filtersReducer,
})

export const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    if (state.count) nextState.count = state.count;
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

export type RootState = ReturnType<typeof rootReducer>