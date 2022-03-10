import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { cardReducer } from "./reducers/cardReducer";

export const store = createStore(cardReducer, applyMiddleware(thunk));
