import React, {useState} from 'react';
import moment from 'moment';
import {Accordion,Card,Button} from 'react-bootstrap';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import './userprofile.css';
import { Link } from 'react-router-dom';


function UserProfile(props){

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

    function Jobs(){
        if(props.jobDetails){
            const Data = props.jobDetails.map((item)=>{
                return(
                    <div key={item.jobId}>
                        <Accordion className="shadow p-3 mb-5 bg-white rounded acc">
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0" className="crd">
                                <div className="ll"> 
                            <ListItem>
                            <ListItemText primary={item.jobTitle} secondary={item.companyName} />
                            </ListItem>
                            <Link to={"/Apply/" + item.jobId}><Button onClick={()=>props.selectedJob(item)} className="btn">Apply</Button></Link>
                            </div>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                            <Card.Body style={{textAlign:'left'}} className='text-left'>
                                <h6 style={{textAlign:'left'}}>Job details</h6>
                                <div>{item.jobDescription}</div>
                                <h6 style={{textAlign:'left'}}>Qualifications expected</h6>
                                <div>{item.jobQualifications}</div>
                                <h6 style={{textAlign:'left'}}>Apply before</h6>
                                <div>{moment(item.jobDeadline).format('DD/MM/YYYY')}</div>
            
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                    </div>
            
                );
            })

            return(Data)
        }
        else{return(null)}
    }


    return(
        <div className="abcd">
            <div className="up one shadow p-3 mb-5 bg-white rounded">
            <Interviews />
            </div>
            <div className="up two">
            <Jobs />
            </div>
        </div>
    );
}

export default UserProfile;