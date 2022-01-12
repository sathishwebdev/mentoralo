import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import App from './App'
import { MentorProfile } from './mentors'
import { StudentProfile } from './students'

function RouteConfig() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<App />}/>
                <Route exact path="/mentors/:mentorName" element={<MentorProfile />} />
                <Route exact path="/students/:studentName" element={<StudentProfile />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RouteConfig
