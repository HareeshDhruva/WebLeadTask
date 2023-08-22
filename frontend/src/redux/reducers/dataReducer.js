import {createReducer } from '@reduxjs/toolkit'

export const LoggedUser = createReducer({isAuth:false},{
  login:(state) =>{
    state.isAuth = true;
  },
  logout:(state) =>{
    state.isAuth = false;
  }
})

export const BackendReducer = (state = {data:[]}, action) => {
    switch (action.type) {
      case 'FETCH_BACKEND_DATA':
        return { ...state, loading: true,};
      case 'FETCH_BACKEND_DATA_SUCCESS':
        return { ...state, data:action.payload};
      case 'FETCH_BACKEND_DATA_FAIL':
        return { ...state, error:action.payload};
      case 'ADD_SUCCESS':
        return {...state, data:state.data.concat(action.payload)};
      case 'REGISTER_SUCCESS':
        return {...state, data:[action.payload]};
      case 'UPDATE':
          const update =  state.data.filter((item) => item.email === action.payload.email? item : action.payload)
          return {...state , data:[update]}
      case 'REMOVE_SUCCESS':
        const updatedSelectedItems = state.data.filter((item) => item.email !== action.payload.email);
        return {...state, data: updatedSelectedItems};
      default:
        return state;
    }
  };


  export const BackendAdminReducer = (state = {admin:[]}, action) => {
    switch (action.type) {
      case 'FETCH_BACKEND_DATA':
        return { ...state, loading: true,};
      case 'FETCH_ADMIN_DATA_SUCCESS':
        return { ...state, admin:[action.payload]};
      case 'FETCH_ADMIN_DATA_FAIL':
        return { ...state, error:action.payload};
      default:
        return state;
    }
  };

  export const BackendUserReducer = (state = {user:[]}, action) => {
    switch (action.type) {
      case 'FETCH_BACKEND_DATA':
        return { ...state, loading: true,};
      case 'FETCH_USER_DATA_SUCCESS':
        return {user:[action.payload]};
      case 'REGISTER_SUCCESS':
        return {user:[action.payload]};
      case 'UPDATE_SUCCESS':
        return {user:[action.payload]};
      case 'FETCH_USER_DATA_FAIL':
        return {error:action.payload};
      default:
        return state;
    }
  };
