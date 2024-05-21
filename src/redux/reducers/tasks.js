import { ADD_TASK, DELETE_TASK } from "../actionTypes";

let initialState ={
  tasks: [],
  history: []
};

export const fetchTasks = (username) => {

  console.info(username, 'username');
  return async (dispatch, getState) => {
    try {
      let res = await fetch('https://pda.139express.com/api/couriertasks?status=0&username='+username);
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

export const fetchHistory = (username) => {

  console.info(username, 'username');
  return async (dispatch, getState) => {
    try {
      let res = await fetch('https://pda.139express.com/api/couriertasks?status=1&username='+username);
      if (!res.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await res.json();

      initialState.history = [];
      
      console.info(resData.tasks, 'resData');
      for (const key in resData.tasks) {
        initialState.history.push(resData.tasks[key]);
      }
    } catch (err) {
      throw err;
    }
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TASK: {
      return {
        ...state,
        tasks: [ action.payload, ...state.tasks]
      };
    }
    case DELETE_TASK: {
      console.info(action.payload, state.tasks, 'DELETE_TASK');
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.object_code != action.payload)
      };
    }
    default:
      return state;
  }
}
