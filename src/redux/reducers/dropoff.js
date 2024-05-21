import { ADD_TASK, DELETE_TASK } from "../actionTypes";

let initialState ={
  items: []
};

export const fetchDropoffs = (username) => {
  return async (dispatch, getState) => {
    try {
      let res = await fetch('https://pda.139express.com/api/couriertasks?username='+username);
      if (!res.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await res.json();

      initialState.tasks = [];
      
      console.info(resData.tasks, 'resData');
      for (const key in resData.tasks) {
        initialState.tasks.push(resData.tasks[key]);
      }
    } catch (err) {
      throw err;
    }
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    // case ADD_TASK: {
    //   const { id, item } = action.payload
    //   return {
    //     ...state,
    //     tasks: [ action.payload, ...state.tasks]
    //   };
    // }
    // case DELETE_TASK: {
    //   console.info(action.payload, 'DELETE_TASK');
    //   return {
    //     ...state,
    //     tasks: state.tasks.filter((task) => task.object_code != action.payload)
    //   };
    // }
    default:
      return state;
  }
}
