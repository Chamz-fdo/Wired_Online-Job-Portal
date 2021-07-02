import React, {useEffect, useState, useContext} from 'react';
import {Accordion,Card,Button} from 'react-bootstrap';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import authContext from './../context/authContext'
import moment from 'moment';
import Footer from './footer';

import UserHeader from './userheader';
import Applicants from './applicants';
import {baseUrl} from './../baseUrl'

const columns = [
    {
        dataField: 'name',
        text: 'Name'
    },{
        text: 'Email',
        formatter: (rowContent, row)=>{
            let url = 'mailTo:' + row.email;
            return(
                <a href={url}>{row.email}</a>
            )
        }
    },{
        text: 'Telephone No.',
        formatter: (rowContent, row)=>{
            let url = 'tel:' + row.telno;
            return(
                <a href={url}>{row.telno}</a>
            )
        }
    },{
        text: 'Linkedin',
        formatter: (rowContent, row)=>{
            let url = 'https://www.' + row.linkedin;
            return(
                <a href={url} target="_blank" rel="noopener noreferrer">Linkedin</a>
            )
        }
    },{
        text: 'Portfolio',
        formatter: (rowContent, row)=>{
            let url = 'https://www.' + row.portfolio;
            return(
                <a href={url} target="_blank" rel="noopener noreferrer">Portfolio</a>
            )
        }
    },{
        text: 'Resume',
        formatter: (rowContent, row)=>{
            return(
                <a href={row.resume} target="_blank" rel="noopener noreferrer">CV</a>
            )
        }
    }
]

function Interviews(){
    return(
        <div>
            <h3>Upcoming Interviews</h3>
            <ListItem>            
                <ListItemText primary="Smith Collins" secondary="01-04-2021, THU,15.30" />
                <Link to="/JoinMeeting"><Button className="jm">join meeting</Button></Link>
            </ListItem>
            <small className="form-text text-muted">You have no more upcoming Interviews</small>

        </div>
    );
}


function CompanyPrivate(props){

    const AuthContext = useContext(authContext)
    const [jobs, setJobs] = useState([])
    const [searchVal , seTSearchVal] = useState('')

    const [applicantsDetails, setApplicantsDetails] = useState()

    useEffect(()=>{
        if(!jobs.length){
            RefreshJobs()
        }
    })

    useEffect(()=>{
        if(props.isChanged){
            RefreshJobs()
            props.setIsChanged(false)                    
        }
    },[props.isChanged])

    function onChangeHandler(name){
        seTSearchVal(name)
    }

    const RefreshJobs=()=>{
        var bearer = 'token ' + AuthContext.token;
        fetch(`${baseUrl}Wired/jobs/${AuthContext.companyEmail}`, {
                  method: 'GET',
                  headers: {
                      'Authorization': bearer,
                      'Content-Type': 'application/json'
                  }
              })
              .then((data)=>data.json())
              .then((data)=>{
                  setJobs(data)})
              .catch((err)=> {console.log(err)})
    }


    function Jobs({jobs}){
        const JOBS=jobs.map((job)=>{
            return(
                <div>
                    <Accordion className="shadow p-3 mb-5 bg-white rounded acc">
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0" className="crd">
                            <div className="ll"> 
                        <ListItem>
                        <ListItemText primary={job.jobTitle} secondary={job.applicants.length+' applicants'} />
                        </ListItem>
                        <Button disabled={job.applicants.length==0} onClick={()=>{setApplicantsDetails(job.applicants)}} className="btn">
                         Applicants
                        </Button>
                        </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <h6>Job details</h6>
                            <p className='text-center'>{job.jobDescription}</p>
                            <h6>Qualifications expected</h6>
                            <p className='text-center'>{job.jobQualifications}</p>
                            <h6>deadline</h6>
                            <p className='text-center'>{moment(job.jobDeadline).format('DD/mm/yyyy')}</p>
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
        <>
        <div>
            <UserHeader company={true} searchVal={searchVal} onChangeHandler={onChangeHandler}/>
            {!applicantsDetails ?
                <>
                    <div className="up one shadow p-3 mb-5 bg-white rounded">
                        <Interviews />
                    </div>
                    <div className="up two mxln">                   
                        <Jobs setApplicantsDetails={setApplicantsDetails} jobs={jobs.length ? jobs.filter((item)=> item.jobTitle.toLowerCase().includes(searchVal.toLowerCase()) || item.companyName.toLowerCase().includes(searchVal.toLowerCase())) : [] } />
                    </div>
                </>
                :
                    <div style={{width:'100%', padding:'0 40px'}} className="up mt-5">  
                        <Applicants setApplicantsDetails={setApplicantsDetails} applicants={applicantsDetails}/>
                    </div>
                }

        </div>
        </>
    );
}

export default CompanyPrivate;
