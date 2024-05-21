let initialState = {
  data: [],
  banner: {}
};

export const fetchProfile = (phone) => {
  return async (dispatch, getState) => {
    try {
      let res = await fetch('http://kz.139express.com/api/profile?phone='+phone);
      
      if (!res.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await res.json();
      // console.info(resData, 'fetchProfile');

      initialState.data = [];
      initialState.banner = {};
      
      initialState.data = resData.profile;
      initialState.banner = resData.banner;
      // for (const key in resData.statuses) {
      //   initialState.statuses.push(resData.statuses[key]);
      // }
    } catch (err) {
      throw err;
    }
  };
};

export const saveProfile = (phone) => {
  return async (dispatch, getState) => {
    try {

      let res = await fetch('http://kz.139express.com/api/profile?phone='+phone);
      
      if (!res.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await res.json();
      // console.info(resData, 'fetchProfile');

      initialState.data = [];
      
      initialState.data = resData.profile;
    } catch (err) {
      throw err;
    }
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
