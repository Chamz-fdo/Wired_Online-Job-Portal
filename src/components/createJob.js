import React, {useState, useContext} from 'react';
import './signupUser.css';
import {useHistory} from 'react-router-dom'
import {Form,Button} from 'react-bootstrap';
import authContext from './../context/authContext'
import UserHeader from './userheader';
import moment from 'moment';

import {baseUrl} from './../baseUrl'

function CreateJob(props){

    const history = useHistory();

    const [validated, setValidated] = useState(false);

    const AuthContext = useContext(authContext)

    const handleSubmit = (event) => {
        event.preventDefault();

      const form = event.currentTarget;
      if (form.checkValidity() === false) {
          console.log(event.target.jobTitle.value)
        event.stopPropagation();
      }
      let data = event.target;
      let job = {};

      job.jobTitle = data.jobTitle.value;
      job.jobDescription = data.jobDescription.value;
      job.jobQualifications = data.jobQualifications.value;
      job.jobDeadline = moment(data.jobDeadline.value).format('DD/MM/yyyy');
      job.companyName = AuthContext.companyName;
      job.companyEmail = AuthContext.companyEmail;

      console.log(job);
      let newData = JSON.stringify(job)

      let formD = new FormData()
      formD.append('job', newData)
      fetch(baseUrl +'Wired/jobs', {
          method: 'POST',
          body: formD
      })
        .then((data)=>data.json())
        .then((data)=>{
          history.push('/CompanyPrivate')
          props.setIsChanged(true)
        })
        .catch((Err)=> {console.log(Err)})

      setValidated(true);
    };

   return(
       <div>
       <UserHeader/>
       <Form className="shadow p-3 mb-5 bg-white rounded crj" noValidate validated={validated} onSubmit={handleSubmit}>
           <h2>Create Job Post</h2>
           <Form.Group controlId="formtitle">
               <Form.Label>Job Title</Form.Label>
               <Form.Control type="text" name='jobTitle' placeholder="Job Title" required/>
               <Form.Control.Feedback type="invalid">
                Please provide the job title.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formtitle">
               <Form.Label>Job Description</Form.Label>
               <Form.Control as="textarea" rows="6" name="jobDescription" placeholder="Job description" required/>
               <Form.Control.Feedback type="invalid">
                Please provide a job description.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formqualification">
               <Form.Label>Qualifications Required</Form.Label>
               <Form.Control as="textarea" name="jobQualifications" rows="6" placeholder="Qualifications required" required/>
               <Form.Control.Feedback type="invalid">
                Please provide qualifications required.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formdeadline">
               <Form.Label>Deadline</Form.Label>
               <Form.Control type="date" name="jobDeadline" placeholder="Qualifications required" required/>
               <Form.Control.Feedback type="invalid">
                Please provide an end date.
                </Form.Control.Feedback>
            </Form.Group>
            

            <Form.Group controlId="formtags">
               <Form.Label>Search tags</Form.Label>
               <Form.Control type="text" placeholder="search tags"/>
            </Form.Group>

            <Button type="submit" id="cacc" >
                Create Job Post
            </Button>

       </Form>
       </div>


   );
        
  
}

export default CreateJob;