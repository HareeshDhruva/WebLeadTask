import axios from 'axios'
const URL = process.env.REACT_APP2_API || "localhost:8000";

export const fetchBackendData = () => {
    return async (dispatch) =>{
        dispatch({type:'FETCH_BACKEND_DATA'});
        await axios.get(URL)
        .then((response)=>{
            dispatch({type:'FETCH_BACKEND_DATA_SUCCESS', payload:response.data});
        })
        .catch((err) =>{
            dispatch({type:'FETCH_BACKEND_DATA_FAIL', payload:err.message});
        });
    };
};

export const fetchBackendAdminData = (adminLogin) => {
    return async (dispatch) =>{
        dispatch({type:'FETCH_BACKEND_DATA'});
        await axios.post(`${URL}/login`,adminLogin)
        .then((response)=>{
          if(response.status === 200){
            dispatch({type:'FETCH_ADMIN_DATA_SUCCESS', payload:response.data});
            dispatch({type:'login'})
          }
        })
        .catch((error) =>{
            dispatch({type:'FETCH_ADMIN_DATA_FAIL', payload:error.message});
        });
    };
};

export const fetchBackenduserData = (loginUser) => {
    return async (dispatch) =>{
        dispatch({type:'FETCH_BACKEND_DATA'});
        await axios.post(`${URL}/login`,loginUser)
        .then((response)=>{
          if(response.status === 200){
            dispatch({type:'FETCH_USER_DATA_SUCCESS', payload:response.data});
            dispatch({type:'login'});
          }
        })
        .catch((err) =>{
            dispatch({type:'FETCH_USER_DATA_FAIL', payload:err.message});
        });
    };
};

export const Adduser = (register)=>{  
  return async (dispatch) => {
    dispatch({ type:'PRODUCT_REQUEST'});
    await axios.post(`${URL}/register`,register)
      .then((response) => {
        if(response.status === 200){
          dispatch({ type:'ADD_SUCCESS', payload: response.data});
          dispatch({type:'login'});
        }
      })
      .catch((error) => {
        dispatch({ type: 'ADD_FAILURE', payload: error.message});
      });
  };
};

export const userRegister = (register)=>{  
  return async (dispatch) => {
    dispatch({ type:'PRODUCT_REQUEST'});
    await axios.post(`${URL}/register`,register)
      .then((response) => {
        if(response.status === 200){
          dispatch({ type:'REGISTER_SUCCESS', payload: response.data});
          dispatch({ type:'UPDATE_SUCCESS', payload: response.data});
          dispatch({ type:'ADD_SUCCESS', payload: response.data});
          dispatch({type:'login'});
        }
      })
      .catch((error) => {
        dispatch({ type: 'ADD_FAILURE', payload: error.message});
      });
  };
};



export const updateUser = (register)=>{
  return async (dispatch) => {
    dispatch({ type:'PRODUCT_REQUEST'});
    await axios.post(`${URL}/update`,register)
      .then((response) => {
        if(response.status === 200){
            dispatch({ type:'UPDATE_SUCCESS', payload: response.data});
            dispatch({ type:'REMOVE_SUCCESS', payload: response.data});
            dispatch({type:'ADD_SUCCESS', payload:response.data});
            dispatch({type:'login'});
        }
      })
      .catch((error) => {
        dispatch({ type: 'ADD_FAILURE', payload: error.message});
      });
  };
};



export const RemoveUser = (email)=>{
    const user = {email:email}
  return async (dispatch) => {
    dispatch({ type:'PRODUCT_REQUEST'});
    await axios.post(`${URL}/remove`,user)
      .then((response) => {
        dispatch({ type: 'REMOVE_SUCCESS', payload: response.data});
      })
      .catch((error) => {
        dispatch({ type: 'REMOVE_FAIL', payload:error.message});
      });
  };
};
