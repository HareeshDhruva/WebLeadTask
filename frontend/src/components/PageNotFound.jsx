import { Typography,Box } from '@mui/material'
import React from 'react'

const PageNotFound = () => {
  return (
    <>
    <Box sx={{width:'100%',height:'100vh',display:'flex', justifyContent:'center', alignItems:'center'}}>
    <Box sx={{display:'flex',height:500,width:800,justifyContent:'center',alignItems:'center',background:'black',borderRadius:10,boxShadow:'0 0 40px #000'}}>
    <Typography>
    <Typography sx={{color:'#fff',fontSize:'50px' ,textShadow:'0 0 40px #fff'}}>PAGE NOT FOUND</Typography>
    <Typography sx={{color:'#fff',fontSize:'50px',textAlign:'center', textShadow:'0 0 40px #fff'}}>404</Typography>
    </Typography>
    </Box>
    </Box>
    </>
  )
}

export default PageNotFound
