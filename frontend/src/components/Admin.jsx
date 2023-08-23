import React, { useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import * as all from '@mui/material/colors';
import {AppBar, Avatar, Box, Button,Dialog,Toolbar, Typography,TextField, Table, TableHead, TableRow, TableCell, TableBody} from '@mui/material'
import {fetchBackendData, Adduser,RemoveUser,fetchBackendAdminData} from '../redux/actions/dataAction'
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const Home = () => {
  const {data} = useSelector(state => state.data);
  const {admin} = useSelector(state => state.admin);

  const Navigate = useNavigate();
  const [Dopen, DsetOpen] = useState(true);
  const dispatch = useDispatch(); 

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

  const [register, setRegister] = useState(initialUser);
  

  const RemoveData = async (email) => {
    console.log(email)
  dispatch(RemoveUser(email))
  }
  
  const Logout = async () => {
    dispatch({type:'logout'})
    Navigate('/')
  }

  const [open, setOpen] = useState(false);

  const DilogOpen = () =>{
    setOpen(true)
  }

  const handleClose = () =>{
    setOpen(false)
  }
  
  const InputChange = (e)=>{
    setRegister({...register, [e.target.name]:e.target.value});
    console.log(e.target.value);
  }


  const NewRegister = async ()=>{
    dispatch(Adduser(register))
    setOpen(false)
  }

  useEffect(()=>{
    dispatch(fetchBackendData())
    dispatch(fetchBackendAdminData())
  },[dispatch]);

  const handleDelay = () =>{
    DsetOpen(false)
  }
  setTimeout(handleDelay,5000)

  return (
    <>
    <Box>
        {
          admin.map((user)=>(
            user.role === 'ADMIN' &&
            <>
            <Box>
            <AppBar>
            <Toolbar>
            <Box sx={{display:'flex', justifyContent:'space-between',width:'90%',margin:'auto'}}>
              <Box sx={{display:'flex',gap:3, alignItems:'center'}}>
                <Avatar/>
                <Typography>{user.name}</Typography>
              </Box>
              <Box sx={{display:'flex',gap:3,alignItems:'center'}}>
              <Typography>ROLE : </Typography>
                <Typography>{user.role}</Typography>
              <Button 
              onClick={DilogOpen}
              sx={{
                background:'#fff',
                ":hover":{
                  background:'#fff'
                }
              }}>ADD USER</Button>
              <Button 
              onClick = {Logout}
              sx={{
                background:'#fff',
                ":hover":{
                  background:'#fff'
                }
              }}>LOGOUT</Button>
              </Box>
              
            </Box>
            </Toolbar>
            </AppBar>
            </Box>
            </>
          ))
        }

       <Dialog open = {open} onClose={handleClose}>
       <TextField sx={{width:300, margin:1,borderRadius:9}} variant='outlined' onChange={(e)=>InputChange(e)} name="name" label="Enter Username" />
              <TextField sx={{width:300, margin:1}} variant='outlined' onChange={(e)=>InputChange(e)} name="email" label="Enter Email" />
              <TextField sx={{width:300, margin:1}} variant='outlined' onChange={(e)=>InputChange(e)} name="mobile" label="Enter phone" />
              <TextField sx={{width:300, margin:1}} variant='outlined' onChange={(e)=>InputChange(e)} name="pin" label="Enter RollNumber" />
              <TextField sx={{width:300, margin:1}} variant='outlined' onChange={(e)=>InputChange(e)} name="password" label="Enter password" />
              <Button 
               sx={{
                margin:'1px auto 5px auto',
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
               onClick={NewRegister}>ADD USER</Button>
       </Dialog>

       <Dialog open = {Dopen} onClose={handleClose}>
       {
        admin.map(item => (
        <Box sx={{width:500, height:500, borderRadius:4 ,display:'flex', alignItems:'center', justifyContent:'center',flexDirection:'column',gap:5}}>
        <box>
            <Typography sx={{fontFamily:'monospace', color:`${all.blue[500]}`,fontSize:20,textShadow:`0 0 10px ${all.blue[500]}`}}>Welcome, {item.name}</Typography>
        </box>
          <Box><CircularProgress color="primary" /></Box>
        </Box>
        ))}
        </Dialog>

      <Box sx={{height:'93vh',marginTop:8,position:'fixed',left:0,right:0,top:0}}>
        <Table>
          <TableHead>
            <TableRow sx={{height:100,borderRadius:5}}>
              <TableCell sx={{textAlign:'center'}}>NAME</TableCell>
              <TableCell sx={{textAlign:'center'}}>EMAIL</TableCell>
              <TableCell sx={{textAlign:'center'}}>ROLL NUMBER</TableCell>
              <TableCell sx={{textAlign:'center'}}>MOBILE</TableCell>
              <TableCell sx={{textAlign:'center'}}>DELETE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
            data.map((item)=>(
            <TableRow sx={{height:100,background:all.green[500],borderRadius:5}}>
              <TableCell sx={{textAlign:'center',color:'#fff'}}>{item.name}</TableCell>
              <TableCell sx={{textAlign:'center',color:'#fff'}}>{item.email}</TableCell>
              <TableCell sx={{textAlign:'center',color:'#fff'}}>{item.pin}</TableCell>
              <TableCell sx={{textAlign:'center',color:'#fff'}}>{item.mobile}</TableCell>
              <TableCell sx={{textAlign:'center',color:'#fff'}}>
              <DeleteIcon sx={{cursor:'pointer',color:'#fff'}} onClick = {(e)=>{RemoveData(item.email)}}/>
              </TableCell>
            </TableRow>
            ))
          }
          </TableBody>
        </Table>      
        </Box>
    </Box>
    </>
  )
}

export default Home
