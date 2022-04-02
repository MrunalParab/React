import {createStore, combineStore, applyMiddleware, combineReducers} from "redux";
import logger from "redux-logger";
import reduxThunk from "redux-thunk";
import rootReducer from "./rootreducer";



const middlewares = [reduxThunk];

if(process.env.NODE_ENV === "development") {
    middlewares.push(logger)
}

const store = createStore(rootReducer,applyMiddleware(...middlewares));



export default store;