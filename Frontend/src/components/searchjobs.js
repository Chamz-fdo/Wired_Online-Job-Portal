import React,{useRef} from 'react';
import {Accordion,Navbar,Nav,Card,Button,FormControl,DropdownButton,Dropdown} from 'react-bootstrap';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import './userprofile.css';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import slogo from '../navlogo.png';


 
function Jobs({jobs}){
    console.log(jobs)
    const JOBS = jobs.map((job)=>{
        return(
            <div>
                <Accordion className="shadow p-3 mb-5 bg-white rounded ac jbs">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0" className="crd">
                        <div className="ll"> 
                    <ListItem>
                    <ListItemText primary={job.jobTitle} secondary={job.companyName} />
                    </ListItem>
                    </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <h6>Job details</h6>
                        <p style={{textAlign:"center"}}>{job.jobDescription}</p>
                        <h6>Qualifications expected</h6>
                        <p style={{textAlign:"center"}}>{job.jobQualifications}</p>
                        <h6>Apply before</h6>
                        <p style={{textAlign:"center"}}>{job.jobDeadline}</p>
    
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            </div>
    
        );
    })

    return (JOBS)
}



function Jobsearch(props){
    
    const serachRef = useRef(null)

    return(
    <div>
    <Navbar className="nvbjs">
        <Navbar.Brand><Link to="/"><img id="logoss" src={slogo} alt="Logo" /></Link></Navbar.Brand>
          
        <Nav className="mr-auto nvjs">
            <Link to="/signIn"><Button>Sign In</Button> </Link>     
            <DropdownButton size="sm" title="Sign Up">
                <Dropdown.Item ><Link to="/Plans" className="dd">Organization</Link></Dropdown.Item>
                <Dropdown.Item><Link to="/SignUp" className="dd">Job Seeker</Link></Dropdown.Item>  
            </DropdownButton>          
        </Nav>
        
        </Navbar>  
    <Navbar>
    <input autoFocus type="text" ref={()=>serachRef} value={props.searchVal} onChange={(event)=>{
        props.onChangeHandler(event.target.value)
        // serachRef.current.focus()
        }} placeholder="Search job title, Company Name" className="search form-control" style={{height:'55px', marginRight:'20px'}}/>
    </Navbar>
    <h6>Sign up or sign in to apply</h6>
    <Jobs  jobs={props.jobDetails}/>
    </div>  
    );
}

export default Jobsearch;
