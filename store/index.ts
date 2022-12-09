import { legacy_createStore as createStore, Store, applyMiddleware } from "redux";
import {Context, createWrapper, MakeStore}  from "next-redux-wrapper"
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

import { reducer, RootState } from "./reducers"

// create a makeStore function
const makeStore: MakeStore<Store<RootState>> = (context: Context) => createStore(reducer, composedEnhancer);

// export an assembled wrapper
export const wrapper = createWrapper<Store<RootState>>(makeStore, {debug: true});
