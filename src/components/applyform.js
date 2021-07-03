import React, {useState} from 'react';
import {Form,Button} from 'react-bootstrap';
import './userprofile.css';
import UserHeader from './userheader';
import {useHistory, useLocation} from 'react-router-dom'

import {baseUrl} from './../baseUrl'
import Loading from './Loading'

function Post({selectedJob}){

    return(
        <div>
            <h5>Job Post</h5>
            <p>{selectedJob.jobTitle}</p>
            <h5>Job description</h5>
            <p>{selectedJob.jobDescription}</p>
            <h5>Qualifications required</h5>
            <ul>{selectedJob.jobQualifications.split('\n').map((item)=>{
                return(
                    <li>{item}</li>                    
                )
            })}</ul>
            <h5>Apply before</h5>
            <p>{selectedJob.jobDeadline}</p>

        </div>
    );
}

function ApplyForm({id, setIsLoading}){
    const [validated, setValidated] = useState(false);
    const [file, setFile] = useState();
    const history = useHistory();
    const location = useLocation();

    const handleSubmit = (event) => {
      const data = event.target;
      event.preventDefault();

      if (data.checkValidity() === false) {
        event.stopPropagation();
      }
      
      setIsLoading(true)
      const applicant = {};
      
      applicant.name = data.name.value;
      applicant.dob = data.dob.value;
      applicant.email = data.email.value;
      applicant.telno = data.telno.value;
      applicant.linkedin = data.linkedin.value;
      applicant.portfolio = data.portfolio.value;
      applicant.filename = file.name;

      let newData = JSON.stringify(applicant)

      let formD = new FormData()
      formD.append('job', newData)
      formD.append('file', file)
      fetch(`${baseUrl}Wired/jobs/apply/${id}`, {
          method: 'POST',
          body: formD
      })
        .then((data)=>data.json())
        .then((data)=>{
          history.push('/userprofile')
          setIsLoading(false)
        })
        .catch((Err)=> {
          console.log(Err)
          setIsLoading(false)
        })
      setValidated(true);
    };

    return(
        <div>
            
            <Form className="up four shadow p-3 mb-5 bg-white rounded" noValidate validated={validated} onSubmit={handleSubmit}>
            <h3>Apply for the Job</h3>
            <Form.Group controlId="formname">
               <Form.Label>Name with Initials</Form.Label>
               <Form.Control type="text" name='name' placeholder="Name with initials" required/>
               <Form.Control.Feedback type="invalid">
                Please provide your name.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formdob">
               <Form.Label>Date of Birth</Form.Label>
               <Form.Control type="date" name='dob' placeholder="DOB" required/>
               <Form.Control.Feedback type="invalid">
                Please provide your date of birth.
                </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group controlId="formemail">
               <Form.Label>Email Address</Form.Label>
               <Form.Control type="email" name='email' placeholder="Email address" required/>
               <Form.Control.Feedback type="invalid">
                Please provide an email address.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formtelno">
               <Form.Label>Telephone number</Form.Label>
               <Form.Control type="text" name='telno' placeholder="Tel no." required/>
               <Form.Control.Feedback type="invalid">
                Please provide a telephone number.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
                <Form.Label>Upload your Resume</Form.Label>
                <Form.Control accept='.pdf' type='file' onChange={(event)=>{
                    console.log(file)
                    setFile(event.target.files[0])
                }} name='resume' id="upload">
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="formlinkedin">
               <Form.Label>Linkedin Profile</Form.Label>
               <Form.Control name='linkedin' type="text" placeholder="linkedin profile"/>
            </Form.Group>

            <Form.Group controlId="formportfolio">
               <Form.Label>Other profile/portfolio</Form.Label>
               <Form.Control name='portfolio' type="text" placeholder="Profile/portfolio"/>
            </Form.Group>

            <Button type="submit" id="app">
                Apply
            </Button>

       </Form>



        </div>

    );
}



function Apply(props){

    const [isLoading, setIsLoading] = useState(false);    

    return(
      <div >
          {isLoading ? <Loading/> : ''}  
          <UserHeader/>
          <div className="up five shadow p-3 mb-5 bg-white rounded">
            <Post selectedJob={props.selectedJob}/>
          </div>
          <div>
            <ApplyForm setIsLoading={setIsLoading} id={props.id} />
          </div>
        </div>
    );
}

export default Apply;
