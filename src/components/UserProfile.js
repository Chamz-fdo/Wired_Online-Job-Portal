import React, {useState} from 'react';
import moment from 'moment';
import {Accordion,Card,Button} from 'react-bootstrap';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import './userprofile.css';
import { Link } from 'react-router-dom';
import {useLocation} from 'react-router-dom';

import Jobs from './jobs'


function UserProfile(props){

    const location= useLocation();

    React.useEffect(()=>{
        props.RefreshJobs()
    },[])

    function Interviews(){
        return(
            <div>
                <h3>Upcoming Interviews</h3>
                <ListItem>
                    <ListItemText primary="ABC Company" secondary="01-04-2021, THU,15.30" />
                    <Link to="/JoinMeeting"><Button className="jm">join meeting</Button></Link>
                </ListItem>
                <small className="form-text text-muted">You have no more upcoming Interviews</small>
            </div>
        );
    }

    return(
        <>
        <div className='d-md-none company-pvt' style={{paddingBottom:'0px'}}>
            <input type="text" disabled={location.pathname.includes('Apply/') ? true : false} value={props.searchVal} onChange={(event)=>{
                props.onChangeHandler(event.target.value)
            }} placeholder="Search job title, Company Name" className="search form-control" style={{height:'55px', marginRight:'20px'}}/>
        </div>
        <div className="company-pvt row" style={{margin:0}}>            
            <div className="company-pvt-interview shadow p-3 mb-5 bg-white rounded">
            <Interviews />
            </div>
            <div className="company-pvt-jobs">
                <Jobs selectedJob={props.selectedJob} jobs={props.jobDetails} mode='user' />
            </div>
        </div>
        </>
    );
}

export default UserProfile;