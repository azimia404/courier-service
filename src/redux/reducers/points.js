import { POINTS } from "../actionTypes";

let initialState ={
  points: [],
  places: [],
};

export const fetchPoints = () => {
  return async (dispatch, getState) => {
    try {
      let res = await fetch('http://kz.139express.com/api/points');
      
      if (!res.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await res.json();
      // console.log(resData, 'resData');
      initialState.points = [];

      for (const key in resData.points) {
        initialState.points.push(resData.points[key]);
        // console.info(resData.points[key]);
      }
    } catch (err) {
      // console.log(err);
      throw err;
    }
  };
};

export const fetchPlaces = () => {
  return async (dispatch, getState) => {
    try {
      let res = await fetch('http://kz.139express.com/api/places');
      
      if (!res.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await res.json();
      console.log(resData, 'places');
      initialState.places = [];

      for (const key in resData.places) {
        initialState.places.push(resData.places[key]);
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
