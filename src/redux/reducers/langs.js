import { LANGS } from "../actionTypes";

let initialState ={
  langs: [],
};

export const fetchLangs = () => {
  return async (dispatch, getState) => {
    try {
      let res = await fetch('http://kz.139express.com/api/langs');
      
      if (!res.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await res.json();
      console.log(resData, 'resData');
      initialState.langs = [];

      for (const key in resData.langs) {
        initialState.langs.push(resData.langs[key]);
        // console.info(resData.points[key]);
      }
    } catch (err) {
      // console.log(err);
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
