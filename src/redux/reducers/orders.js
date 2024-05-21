import { ADD_ORDER, DELETE_ORDER, SET_ORDERS } from "../actionTypes";

let initialState ={
  orders: [],
  total_count: 0,
};

export const fetchOrders = (user) => {
  return async (dispatch, getState) => {
    try {
      let res = await fetch('https://pda.139express.com/api/pickupinventory?S_Country='+user.S_Country+'&S_Code='+user.S_Code);
      if (!res.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await res.json();

      initialState.orders = [];
      initialState.total_count = resData.total_count;
      for (const key in resData.data) {
        initialState.orders.push(resData.data[key]);
      }
    } catch (err) {
      throw err;
    }
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ORDER: {
      return {
        ...state,
        total_count: (state.total_count+1),
        orders: [ action.payload, ...state.orders]
      };
    }
    case DELETE_ORDER: {
      console.info(DELETE_ORDER);
      return {
        ...state,
        total_count: (state.total_count-1),
        orders: state.orders.filter((order) => order.TrackingNumber != action.payload)
      };
    }
    default:
      return state;
  }
}
