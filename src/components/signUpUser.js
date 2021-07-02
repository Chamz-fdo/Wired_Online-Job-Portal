import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import './signupUser.css';
import {Form,Button} from 'react-bootstrap';

import {baseUrl} from './baseUrl'

function SignupUser(){

    const history = useHistory();
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
      
      event.preventDefault();
      
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.stopPropagation();
        setValidated(true);
      }
      else{
        let userData = {};
        userData.email = form.email.value;
        userData.password = form.password.value;
        userData.FName = form.FName.value;
        userData.LName = form.LName.value;

        let old = JSON.stringify(userData)

        fetch(baseUrl +'users/',{
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: old
        })
          .then((data) => data.json())
          .then((data)=>{
              history.push('/signin')
            })
          .catch((Err)=> {
            console.log(Err)
            setValidated(true);
          })
      }
  
    };

   return(
       <Form className="abc shadow p-3 mb-5 bg-white rounded" noValidate validated={validated} onSubmit={handleSubmit}>
           <h2>Sign Up</h2>
           <Form.Group controlId="formfname">
               <Form.Label>First Name</Form.Label>
               <Form.Control type="text" placeholder="First name" name='FName' required/>
               <Form.Control.Feedback type="invalid">
                Please provide your first name.
                </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group controlId="formlname">
               <Form.Label>Last Name</Form.Label>
               <Form.Control type="text" placeholder="Last name" name='LName' required/>
               <Form.Control.Feedback type="invalid">
                Please provide your last name.
                </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group controlId="formemail">
               <Form.Label>Email Address</Form.Label>
               <Form.Control type="email" placeholder="Email address" name='email' required/>
               <Form.Control.Feedback type="invalid">
                Please provide an email address.
                </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group controlId="formpwd">
                <Form.Label>Set Password</Form.Label>
                <Form.Control type="password" placeholder="Set password" name='password' required/>
                <Form.Control.Feedback type="invalid">
                Please provide a password.
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                Your password must contain at least 8 characters, a capital letter and numbers, and must not contain spaces.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="confirmpwd">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" required/>
                <Form.Control.Feedback type="invalid">
                Please confirm the password.
                </Form.Control.Feedback>
                
            </Form.Group>

            <Button type="submit" id="zxy">
                Sign Up
            </Button>

       </Form>


   );
        
  
}

export default SignupUser;