import React,{useState, useEffect} from 'react'
import * as Icons from '@mui/icons-material'
import * as mui from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UnassignedStudents } from './students';
  // style 

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
//   const TextField = mui.styled(mui.TextField)({
//     '& label.Mui-focused': {
//       color: "black"
//     },
//     '& .MuiInput-underline:after': {
//       borderBottomColor: 'black',
//     },
//     '& .MuiOutlinedInput-root': {
//       '&.Mui-focused fieldset': {
//         borderColor: 'black',
//       },
//     },
//   });


function MentorSlide() {

    const navigate = useNavigate()
    const [mentors, setMentors] = useState(null) 

    useEffect(()=>{
        fetch('https://mentoralo.herokuapp.com/mentors')
        .then(response => response.json())
        .then(data=>{
            setMentors(data)
        })
    },[])

    return (
        <div className="slide-container" >
            <h1>Mentors</h1>
            <div className="slide" >

                {!mentors ? <h1>Loading...</h1> 
                : 
                mentors.data.map((mentor, key)=>(<div key={key} className = "slide-card" >
                    <div style={{
                        height: "200px",
                        backgroundColor: "gray",
                        textAlign: "center"
                    }} >
                        <Icons.Person sx={{
                            fontSize: "180px"
                        }} />
                    </div>
                    <div style={{padding:"3%" }}>
                        <div style={{lineHeight:"1"}} >
                            <h2>{mentor.name}</h2>
                            <small style={{color: "gray"}} >{`@${mentor.mentorName}`}</small>
                        </div>
                        <div style={{margin: "2%"}}>
                            <p>No. Students : {mentor.numOfStudents}</p>
                        </div>
                        <Button
                            sx={{
                                width:"95%"
                            }}

                           onClick={()=>{
                               navigate(`../mentors/${mentor.mentorName}`)
                           }}
                        >
                            View
                        </Button>
                        
                    </div>
                </div>))}

            </div>
        </div>
    )
}


const MentorProfile = () =>{

    const navigate = useNavigate()
    const {mentorName} = useParams()
    const [mentor , setMentor] = useState(null)
    
     useEffect(()=>{
        fetch(`https://mentoralo.herokuapp.com/mentors/${mentorName}`)
        .then(res => res.json() )
        .then(({data}) => {
            setMentor(data[0])
            
        })
    },[])

    return <div className='App'>
        {
            !mentor? <h1>loading...</h1> : <div >
                <h1>MENTOR PROFILE</h1>
                <div className='profile' >
                    <Icons.Person sx={{fontSize:"180px"}} />
                </div>
                <br/>
                <h1 style={{ textTransform:"uppercase" }} >{mentor.name}</h1>
                <div>
                    <p>@{mentor.mentorName}</p>
                    <p>Total No. Students : {mentor.numOfStudents}</p>
                    <h2>STUDENTS OF <span style={{ textTransform:"uppercase" }}>{mentor.name}</span></h2>
                    <table>
                        <thead>
                            <tr>
                                <th>SI. No.</th>
                                <th>Name</th>
                                <th>StudentName</th>
                                <th>Id</th>
                                <th>Profile</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mentor.students.map((student, si) =>(<tr key={si} >
                                <td>{si+1}</td>
                                <td>{student.name}</td>
                                <td><Link className='link' to={`../students/${student.studentName}`} >@{student.studentName}</Link></td>
                                <td>{student.studentId}</td>
                                <td> <Button
                                    onClick={()=>{
                                        navigate(`../students/${student.studentName}`)
                                    }}
                                >
                                    View
                                    </Button> </td>
                            </tr>))}
                        </tbody>
                    </table>
                </div>
            </div>
        }
       <UnassignedStudents  />
    </div>
}

// const CreateMentor = () =>{

// }

export {
    MentorSlide,
    MentorProfile
}
