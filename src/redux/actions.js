import { ADD_ORDER, DELETE_ORDER } from "./actionTypes";

let nextOrderId = 0;

export const addOrder = order => ({
  type: ADD_ORDER,
  payload: {
    id: ++nextOrderId,
    order
  }
});

export const deleteOrder = id => ({
  type: DELETE_ORDER,
  payload: {
    id
  }
});