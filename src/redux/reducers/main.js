import { MAIN } from "../actionTypes";

let initialState = {
  contacts: [],
  infoBlocks: [],
  banner: [],
  instagram: [],
  oferta: [],
  video: [],
  app: []
};

export const fetchSiteInfo = (countryCode) => {

  // console.log(initialState, 'initialState');

  return async (dispatch, getState) => {
    console.log(countryCode, 'countryCode');
    try {
      let res = await fetch('http://kz.139express.com/api/site?country='+countryCode);

      // console.log(res, 'fetchSiteInfo');
      
      if (!res.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await res.json();
      console.log(resData, 'resData');


      initialState.contacts = [];
      initialState.infoBlocks = [];
      initialState.banner = [];
      initialState.instagram = [];
      initialState.oferta = [];
      initialState.video = [];
      initialState.app = [];

      for (const key in resData.contacts) {
        initialState.contacts.push(resData.contacts[key]);
      }
      for (const key in resData.infoBlocks) {
        initialState.infoBlocks.push(resData.infoBlocks[key]);
      }
      initialState.banner = resData.banner;
      initialState.instagram = resData.instagram;
      initialState.oferta = resData.oferta;
      initialState.video = resData.video;
      initialState.app = resData.app;
      // initialState = resData;
      // console.log(initialState);
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
