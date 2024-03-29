import * as api from "../api";
import { setCurrentUser } from "./currentUser";

export const fetchAllUsers = () => async (dispatch) => {
  try {
    const { data } = await api.getAllUsers();
    dispatch({ type: "FETCH_USERS", payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const updateProfile = (id, updateData) => async (dispatch) => {
  try {
    const { data } = await api.updateProfile(id, updateData);
    dispatch({ type: "UPDATE_CURRENT_USER", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const subscription = (id, value) => async (dispatch) => {
  try {
    const { data } = await api.subscribe(id, value);
    dispatch({ type: "UPDATE_CURRENT_USER", payload: data });
    //dispatch({ type: "AUTH", payload: {result:data} });
    dispatch(setCurrentUser({result:data}));
    
  } catch (error) {
    console.log(error);
  }
};
