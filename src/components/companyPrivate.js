import React, {useEffect, useState, useContext} from 'react';
import {Accordion,Card,Button} from 'react-bootstrap';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import authContext from './../context/authContext'
import moment from 'moment';
import {useLocation} from 'react-router-dom';

import Footer from './footer';
import Jobs from './jobs'
import UserHeader from './userheader';
import Applicants from './applicants';
import {baseUrl} from './../baseUrl'
import Loading from './Loading'

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

    const [isLoading, setIsLoading] = useState(true);    

    const location = useLocation();
    const AuthContext = useContext(authContext)
    const [jobs, setJobs] = useState([])
    const [searchVal , seTSearchVal] = useState('')

    const [applicantsDetails, setApplicantsDetails] = useState()

    useEffect(()=>{
        if(!jobs.length){
            setIsLoading(true)            
            RefreshJobs()
        }
    })

    useEffect(()=>{
        if(props.isChanged){
            setIsLoading(true)
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
                  setJobs(data)
                  setIsLoading(false)                  
              })
              .catch((err)=> {console.log(err)})
    }

    return(
        <>
        <div>
            {isLoading ? <Loading/> : ''}        
            <UserHeader company={true} searchVal={searchVal} onChangeHandler={onChangeHandler}/>
            <div className='d-md-none company-pvt' style={{paddingBottom:'0px'}}>
                <input type="text" disabled={location.pathname.includes('Apply/') ? true : false} value={searchVal} onChange={(event)=>{
                    onChangeHandler(event.target.value)
                }} placeholder="Search job title, Company Name" className="search form-control" style={{height:'55px', marginRight:'20px'}}/>
            </div>
            {!applicantsDetails ?
                <div className='company-pvt row' style={{margin:0}}>
                    <div className="shadow company-pvt-interview p-3 mb-5 bg-white rounded">
                        <Interviews />
                    </div>
                    <div className="company-pvt-jobs">                   
                        <Jobs setApplicantsDetails={setApplicantsDetails} mode='company' jobs={jobs.length ? jobs.filter((item)=> item.jobTitle.toLowerCase().includes(searchVal.toLowerCase()) || item.companyName.toLowerCase().includes(searchVal.toLowerCase())) : [] } />
                    </div>
                </div>
                :
                    <div style={{width:'100%', padding:'0 40px'}} className="up applicants-table mt-5">  
                        <Applicants setApplicantsDetails={setApplicantsDetails} applicants={applicantsDetails}/>
                    </div>
                }

        </div>
        </>
    );
}

export default CompanyPrivate;
