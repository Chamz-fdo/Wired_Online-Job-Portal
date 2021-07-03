import React,{useRef} from 'react';
import {Accordion,Navbar,Nav,Card,Button,FormControl,DropdownButton,Dropdown} from 'react-bootstrap';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';


const Jobs=(props)=>{

	function RenderJobs({jobs}){
	    const JOBS = jobs.map((job,id)=>{
	        return(
	            <div>
	                <Accordion defaultActiveKey={id === 0 ? "0" : ''} className={props.mode === 'guest' ? "shadow p-3 mb-5 bg-white rounded search-jobs-single" : "shadow p-3 mb-5 bg-white rounded search-jobs-single-user"}>
	                <Card>
	                    <Accordion.Toggle as={Card.Header} eventKey='0' className="crd">
	                        <div className="ll"> 
	                    <ListItem>
	                    <ListItemText className='job-topic' primary={job.jobTitle} secondary={props.mode === 'company' ? job.applicants.length +' Applicants' : job.companyName} />
	                    </ListItem>
	                    {props.mode === 'company' ? 
		                    <Button disabled={job.applicants.length==0} onClick={()=>{props.setApplicantsDetails(job.applicants)}} className="btn">
	                         Applicants
	                        </Button>
	                    : props.mode === 'user' ? 
                            <Link to={"/Apply/" + job.jobId}><Button onClick={()=>props.selectedJob(job)} className="btn">Apply</Button></Link>	                    	
	                    :''}
	                    </div>
	                    </Accordion.Toggle>
	                    <Accordion.Collapse eventKey="0">
	                    <Card.Body>
	                        <div className='top-details-container'>
	                        <div className='top-details-topics'>Job details</div>
	                        <div  className='top-details'>
	                            {job.jobDescription.split('\n').map((item)=>{
	                                return(
	                                    <div>{item}</div>                    
	                                )
	                            })}
	                        </div>
	                        </div>
	                        <div className='top-details-container'>
	                        <div className='top-details-topics'>Qualifications expected</div>
	                        <div  className='top-details'>
	                            {job.jobQualifications.split('\n').map((item)=>{
	                                return(
	                                    <li>{item}</li>                    
	                                )
	                            })}
	                        </div>
	                        </div>
	                        <div className='top-details-container'>
	                        <div className='top-details-topics'>Apply before</div>
	                        <div  className='top-details' style={{textAlign:"center"}}>{job.jobDeadline}</div>
	                        </div>
	                    </Card.Body>
	                    </Accordion.Collapse>
	                </Card>
	            </Accordion>
	            </div>
	    
	        );
	    })

	    return (JOBS)
	}

	return(
		<RenderJobs jobs={props.jobs} />
	)
}

export default Jobs;