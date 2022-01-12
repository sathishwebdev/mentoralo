import React from 'react'
import {BrowserRouter, Link, Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import App from './App'
import { MentorProfile } from './mentors'
import { ListAllStudents, StudentProfile } from './students'
import * as mui from '@mui/material'

  const Button = mui.styled(mui.Button)(({ theme }) => ({
    color: theme.palette.getContrastText(mui.colors.purple[500]),
    backgroundColor: "#000000",
    margin: "3%",
    fontFamily: "pease-san",

    '&:hover': {
      backgroundColor: "#a5a5a5",
      color: "black",
      boxShadow: "0px 0px 15px 1px"
    },
  }));

function RouteConfig() {

    

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<><NavBar/><App /></>}/>
                <Route exact path="/mentors/:mentorName" element={<><NavBar/><MentorProfile /></>} />
                <Route exact path="/students/:studentName" element={<><NavBar/><StudentProfile /></>} />
                <Route exact path="/students" element={<><NavBar/><ListAllStudents /></>} />    
                <Route path="*" element={<><NavBar/><div className="App-header" ><Link to="/" > <img alt='mentors' title="mentors" src='/img/assignMentor.png' width="200" style={{borderRadius:"25px"}} /></Link> <h1>404</h1><p>Page Not Available</p> </div></>} />
                    
                
            </Routes>
        </BrowserRouter>
    )
}

export default RouteConfig


const NavBar = () =>{
    const location = useLocation()
    const navigate = useNavigate()

    return       <div
        style={{
            marginRight : "auto",
            marginLeft : "auto"
        }}
    >
    { location.pathname === '/' ? <Button
     onClick={()=>{
         navigate('../')
     }}
    >
         Home
     </Button> : <Button
     
     onClick={()=>{
         navigate(-1)
     }}

     >
         Back
     </Button> }
     <Button
          onClick={()=>{
             navigate('../students')
         }}
     >
         Students
     </Button>
     <Button
         onClick={()=>{
             navigate('../mentors')
         }}
     >
         Mentors
     </Button>
     
    </div>
}