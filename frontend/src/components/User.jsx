import React, { useEffect,useState} from 'react'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import * as all from '@mui/material/colors';
import {AppBar, Avatar, Box, Button,Toolbar, Typography,Table,TableCell,TableHead,TableBody,TableRow,Dialog,TextField} from '@mui/material'
import {fetchBackendData, updateUser} from '../redux/actions/dataAction'
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const User = () => {
  const {data} = useSelector(state => state.data);
  const {user} = useSelector(state => state.user);
  const [open, setOpen] = useState(false);
  const [Dopen, DsetOpen] = useState(true);

  const Navigate = useNavigate();

  const [register, setRegister] = useState(user[0]);

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchBackendData())
  },[dispatch]);

  const updateData = async () => {
    dispatch(updateUser(register))
    setOpen(false)
  }

  const handleClose = () =>{
    setOpen(false)
    DsetOpen(false)
  }

  
  const InputChange = (e)=>{
    setRegister({...register, [e.target.name]:e.target.value});
  }
  
  const Logout = async () => {
    dispatch({type:'logout'})
    Navigate('/');
  }
  
  const handleDelay = () =>{
    DsetOpen(false)
  }
  setTimeout(handleDelay,5000)

  return (
    <>
    <Box>
        {
          user.map((item)=>(
            <>
            <Box>
            <AppBar>
            <Toolbar>
            <Box sx={{display:'flex', justifyContent:'space-between',width:'90%',margin:'auto'}}>
              <Box sx={{display:'flex',gap:3, alignItems:'center'}}>
                <Avatar sx={{bgcolor:all.orange[400]}}>{item.name[0]}</Avatar>
                <Typography>{item.name}</Typography>
              </Box>
              <Box sx={{display:'flex',gap:3,alignItems:'center'}}>
              <Typography>ROLE : </Typography>
                <Typography>{item.role}</Typography>
              <EditIcon 
              sx={{cnamer:'pointer',color:'#fff'}} 
              onClick = {(e)=>{setOpen(true)}}
              />
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
        {
          user.map((item)=>(
            <>
            <TextField sx={{width:300, margin:1,borderRadius:9}} variant='outlined' onChange={(e)=>InputChange(e)} name="name" placeholder={item.name}/>
              <TextField sx={{width:300, margin:1}} variant='outlined' onChange={(e)=>InputChange(e)} name="email" placeholder={item.email} />
              <TextField sx={{width:300, margin:1}} variant='outlined' onChange={(e)=>InputChange(e)} name="mobile" placeholder={item.mobile}/>
              <TextField sx={{width:300, margin:1}} variant='outlined' onChange={(e)=>InputChange(e)} name="pin" placeholder={item.pin}/>
              <TextField sx={{width:300, margin:1}} variant='outlined' onChange={(e)=>InputChange(e)} name="password" placeholder='Protected'/>
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
               onClick={updateData}
               >UPDATE USER</Button>
            </>
          ))
        }
       </Dialog>

       <Dialog open = {Dopen} onClose={handleClose}>
       {
        user.map(item => (
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

export default User
