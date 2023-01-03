import changeTheNumber from "./updown";
import userReducer from "./userReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
    userReducer,
    // changeTheNumber
}
);

export default rootReducer;