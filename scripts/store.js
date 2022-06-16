import { createStore, applyMiddleware,compose } from "redux";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./reducers";



// creating store
export const store = createStore(rootReducer, compose(applyMiddleware(thunk)))

// assigning store to next wrapper
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);