import React, {useState} from 'react'
import { Typography, Box, Button, TextField} from '@mui/material'
import {useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchBackenduserData,fetchBackendAdminData, userRegister}from '../redux/actions/dataAction'


const Register = () => {

  const Navigate = useNavigate();

  const chooseRole = {
    user:'USER',
    admin:'ADMIN'
  }

    const initialUser = {
      name:'',
      email:'',
      mobile:'',
      pin:'',
      role:chooseRole.user,
      password:''
    };

    const initialLoginUser = {
      email:'',
      password:'',
      role:chooseRole.user
    };

    const initialLoginAdmin = {
      email:'',
      password:'',
      role:chooseRole.admin,
    };

  const [register, setRegister] = useState(initialUser);
  const [logingUser,setLoginUser] =useState(initialLoginUser);
  const [adminLog, setAdminLog] = useState(initialLoginAdmin);
  const [loged, setLogin] = useState(false);

  const dispatch = useDispatch();

  const useRegisterPage = () =>{
    setLogin(true);
  }
  
  const InputChange = (e)=>{
    setRegister({...register, [e.target.name]:e.target.value});
    setAdminLog({...adminLog, [e.target.name]:e.target.value});
    setLoginUser({...logingUser, [e.target.name]:e.target.value});
  }


const LoginUser = async ()=>{
  try{
    dispatch(fetchBackenduserData(logingUser));
    Navigate('/user')
  }
  catch(err){
      Navigate('/')
  }
}

const adminLogin = async ()=>{
  try{
    dispatch(fetchBackendAdminData(adminLog));
    Navigate('/admin')
  }
  catch(err){
      Navigate('/')
  }
}

const NewRegister = async ()=>{
  try{
    dispatch(userRegister(register))
    Navigate('/user');
  }
  catch(err){
    Navigate('/');
  }
}

  return (
    <div>
        {
          <Box 
          sx={{
            display:'flex',
            height:'100vh',
            width:'100%', 
            justifyContent:'center',
            alignItems:'center',
            background:'black',
            }}>
            <Box 
            sx={{
               height:'500px',
               background:'#fff',
               width:'50%',
               borderRadius:5,
               boxShadow:'0 0 200px indigo'
               }}>

               {
                loged !== true ?
              <Typography
              sx={{
                fontSize:20,
                color:'#fff',
                textAlign:'center',
                fontFamily:'monospace',
                padding:1,
                margin:4,
                borderRadius:2,
                boxShadow:'0 0 10px black',
                border:'1px solid gray',
                background:'#000',
                ":hover":{
                  background:'black',
                  color:'#fff',
                  boxShadow:'0 0 40px black',
                  }
                }}>
                LOGIN OPTIONS
              </Typography>
              :
              <Typography
              sx={{
                fontSize:20,
                color:'#fff',
                textAlign:'center',
                fontFamily:'monospace',
                padding:1,
                margin:1,
                borderRadius:2,
                boxShadow:'0 0 10px black',
                border:'1px solid gray',
                background:'#000',
                ":hover":{
                  background:'black',
                  color:'#fff',
                  boxShadow:'0 0 40px black',
                  }
                }}>
                REGISTER USER
              </Typography>
               }

            {
              loged !== true ?
              <Box sx={{display:'flex', justifyContent:'center', flexDirection:'column'}}>
              <Box sx={{margin:'auto', marginBottom:5}}>
                <TextField sx={{width:'90%', margin:1}} 
                variant='outlined' 
                onChange={(e)=>InputChange(e)} 
                name="email" label="Enter Email" 
                color='success'
                />
                <TextField sx={{width:'90%', margin:1}} 
                variant='outlined' 
                onChange={(e)=>InputChange(e)} 
                name="password" 
                label="Enter Password"
                color='success'
                />
              </Box>

              <Box sx={{display:'flex',flexDirection:'column', gap:1,justifyContent:'center'}}>
              <Button 
               sx={{
                margin:'auto',
                width:'90%',
                fontSize:20,
                textAlign:'center',
                fontFamily:'monospace',
                borderRadius:2,
                color:'#fff',
                background:'#000',
                ":hover":{
                  background:'black',
                  boxShadow:'0 0 40px black',
                  }
              }}
              onClick={LoginUser}>LOGIN AS USER</Button>

              <Box onClick={adminLogin} sx={{cursor:'pointer', display:'flex'}}>
              <Button 
               sx={{
                margin:'auto',
                width:'90%',
                fontSize:20,
                textAlign:'center',
                fontFamily:'monospace',
                borderRadius:2,
                background:'black',
                color:'#fff',
                ":hover":{
                  background:'black',
                  boxShadow:'0 0 40px back',
                  }
              }}
              onClick={adminLogin}>LOGIN AS Admin</Button>
               </Box>


              <Box onClick={useRegisterPage} sx={{cursor:'pointer', display:'flex'}}>
              <Button 
               sx={{
                width:'90%',
                margin:'auto',
                fontSize:20,
                textAlign:'center',
                fontFamily:'monospace',
                borderRadius:2,
                color:'#fff',
                background:'#000',
                ":hover":{
                  background:'black',
                  boxShadow:'0 0 40px black',
                  }
              }}
              onClick={useRegisterPage}>sign up</Button>
               </Box>
              </Box>
              </Box>
              :
              <Box sx={{display:'flex', flexDirection:'column',alignItems:'center'}}>
              <TextField sx={{width:300, margin:1,borderRadius:9}} variant='outlined' onChange={(e)=>InputChange(e)} name="name" label="Enter Username" />
              <TextField sx={{width:300, margin:1}} variant='outlined' onChange={(e)=>InputChange(e)} name="email" label="Enter Email" />
              <TextField sx={{width:300, margin:1}} variant='outlined' onChange={(e)=>InputChange(e)} name="mobile" label="Enter phone" />
              <TextField sx={{width:300, margin:1}} variant='outlined' onChange={(e)=>InputChange(e)} name="pin" label="Enter RollNumber" />
              <TextField sx={{width:300, margin:1}} variant='outlined' onChange={(e)=>InputChange(e)} name="password" label="Enter password" />
              <Button 
               sx={{
                margin:'auto',
                marginTop:3,
                width:'90%',
                fontSize:20,
                textAlign:'center',
                fontFamily:'monospace',
                borderRadius:2,
                color:'#fff',
                background:'#000',
                ":hover":{
                  background:'black',
                  boxShadow:'0 0 40px black',
                  }
                }}
               onClick={NewRegister}>CLICK TO REGISTER</Button>
              </Box>
            }
            </Box>
        </Box>
        }
    </div>
  )
}

export default Register
