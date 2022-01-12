import React,{useState, useEffect} from 'react'
import * as Icons from '@mui/icons-material'
import * as mui from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom';
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


function StudentSlide() {

    const navigate = useNavigate()
    const [students, setStudents] = useState(null) 

    useEffect(()=>{
        fetch('https://mentoralo.herokuapp.com/students')
        .then(response => response.json())
        .then(data=>{
            setStudents(data)
        })
    },[])

    return (
        <div className="slide-container" >
            <h1>Students</h1>
            <div className="slide" >

                {!students ? <h1>Loading...</h1> 
                : 
                students.data.map((student, key)=>(<div key={key} className = "slide-card" >
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
                            <h2>{student.name}</h2>
                            <small style={{color: "gray"}} >{`@${student.studentName}`}</small>
                            
                        </div>
                        <div style={{margin: "2%"}}>
                            <p>Mentor : {!student.mentorDetails ? '' :student.mentorDetails.name}</p>
                        </div>
                        <Button
                            sx={{
                                width:"95%"
                            }}

                            onClick={()=>{
                                navigate(`/students/${student.studentName}`)
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
const UnassignedStudents = () =>{
    const navigate = useNavigate()
    const [freeStudents, setFreeStudents] = useState(null)

    useEffect(()=>{
       

       fetch(`https://mentoralo.herokuapp.com/students/unassign`)
       .then(res => res.json() )
       .then(({data}) => {
           setFreeStudents(data)
           
       })


   },[])
    return <div>
         <h2>UNASSIGNED STUDENTS</h2>
        {
            !freeStudents? <h2>Loading...</h2> : freeStudents.length === 0? <p style={{color: 'gray'}}>All students are assigned</p> :  <table>
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
                {freeStudents.map((student, si) =>(<tr key={si} >
                    <td>{si+1}</td>
                    <td>{student.name}</td>
                    <td><Link className='link' to={`/students/${student.studentName}`} >@{student.studentName}</Link></td>
                    <td>{student.studentId}</td>
                    <td> <Button
                        onClick={()=>{
                            navigate(`/students/${student.studentName}`)
                        }}
                    >
                        View
                        </Button> </td>
                </tr>))}
            </tbody>
        </table>
        }
    </div>
}


const StudentProfile = () =>{


    const {studentName} = useParams()
    const [student , setStudent] = useState(null)
    
     useEffect(()=>{
        fetch(`https://mentoralo.herokuapp.com/students/${studentName}`)
        .then(res => res.json() )
        .then(({data}) => {
            setStudent(data[0])
            
        })
    },[])

    return <div className='App'>
        {
            !student? <h1>loading...</h1> : <div >
                <h1>STUDENT PROFILE</h1>
                <div className='profile' >
                    <Icons.Person sx={{fontSize:"180px"}} />
                </div>
                <br/>
                <h1 style={{ textTransform:"uppercase" }} >{student.name}</h1>
                <div>
                    <p>@{student.studentName}</p>
                    <p>Mentor :
                    { !student.mentorDetails ? <p>No body</p>:
                    <span> {' '}
                       @<Link className='link' to={`/mentors/${student.mentorDetails.mentorName}`}>{student.mentorDetails.mentorName}</Link>
                    </span>
                    }</p>
                </div>
            </div>
        }
    </div>
}


// list all students

const ListAllStudents = () =>{
    const navigate = useNavigate()
    const [freeStudents, setFreeStudents] = useState(null)

    const getData = () =>{
        fetch(`https://mentoralo.herokuapp.com/students`)
        .then(res => res.json() )
        .then(({data}) => {
            setFreeStudents(data)
            
        })
    }

    useEffect(()=>{
      getData();
   },[])

    const reAssign = async () =>{
        setFreeStudents(null)
       await fetch(`https://mentoralo.herokuapp.com/reassign`,{
            method: 'PUT'
        })
        
        getData();
    }
    const autoAssign = async () =>{
        setFreeStudents(null)
       await fetch(`https://mentoralo.herokuapp.com/assign`,{
            method: 'PUT'
        })
        
        getData();
    }
   

    return <div className='App' style={{
        paddingBottom: "200px"
    }} >
         <div style={{display: "inline"}}>
             <h2>STUDENTS LIST </h2>   
             <div style={{
                 width:"100%"
             }} ><img alt="students" title="students" src="img/createStudent.png" height="400" /> </div>            
                <Button
                    onClick={reAssign}
                >
                ReAssign
                </Button>
                <Button
                    onClick={autoAssign}
                >
                Auto Assign
                </Button>
            
         </div>
        {
            !freeStudents? <h2>Loading...</h2> : freeStudents.length === 0? <p style={{color: 'gray'}}>All students are assigned</p> :  <table>
            <thead>
                <tr>
                    <th>SI. No.</th>
                    <th>Name</th>
                    <th>StudentName</th>
                    <th>Id</th>
                    <th>Mentor</th>
                    <th>Profile</th>
                </tr>
            </thead>
            <tbody>
                {freeStudents.map((student, si) =>(<tr key={si} >
                    <td>{si+1}</td>
                    <td>{student.name}</td>
                    <td><Link className='link' to={`../students/${student.studentName}`} >@{student.studentName}</Link></td>
                    <td>{student.studentId}</td>
                    <td>{!student.mentorDetails ? <i style={{color:"#101010"}} >unassigned</i> : <Link className='link' to={`../mentors/${student.mentorDetails.mentorName}`} >{student.mentorDetails.mentorName}</Link>}</td>
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
        }
    </div>
}




export {
    StudentSlide, UnassignedStudents, StudentProfile, ListAllStudents
}
