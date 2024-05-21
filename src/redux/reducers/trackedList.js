import { ADD_ITEM, CLEAR_ITEMS } from "../actionTypes";
let initialState = {
  list: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM: {
      return {
        ...state,
        list: [ ...state.list, action.payload]
      };
    }
    case CLEAR_ITEMS: {
      return {
        ...state,
        list: []
      };
    }
    default:
      return state;
  }
}
