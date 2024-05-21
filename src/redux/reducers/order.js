import { ADD_ORDER, DELETE_ORDER, SET_ORDERS } from "../actionTypes";

let initialState = {
  statuses: []
};

export const fetchOrder = (code) => {
  return async (dispatch, getState) => {
    try {
      let res = await fetch('http://kz.139express.com/api/order?code='+code);
      
      if (!res.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await res.json();

      initialState.statuses = [];
      
      for (const key in resData.statuses) {
        initialState.statuses.push(resData.statuses[key]);
      }
    } catch (err) {
      throw err;
    }
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    // case ADD_ORDER: {
    //   const { id, order } = action.payload
    //   return {
    //     ...state,
    //     orders: [ ...state.orders, { id, order }]
    //   };
    // }
    // case DELETE_ORDER: {
    //   const { id } = action.payload
    //   return {
    //     ...state,
    //     orders: state.orders.filter((order) => order.id != id)
    //   };
    // }
    default:
      return state;
  }
}
