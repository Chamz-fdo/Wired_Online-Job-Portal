import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import {Form,Button} from 'react-bootstrap';

import {baseUrl} from './../baseUrl'
import Loading from './Loading'

function CreateAcc(){
    const [isLoading, setIsLoading] = useState(false);    
    const [isError, setIsError] = useState(false);    
  
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
        setIsLoading(true)
        let userData = {};
        userData.email = form.email.value;
        userData.password = form.password.value;
        userData.companyName = form.companyName.value;
        userData.mobileNo = form.mobileNo.value;

        let old = JSON.stringify(userData)

        fetch(baseUrl +'users/',{
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: old
        })
          .then((data) => data.json())
          .then((data)=>{
              history.push('/signin')
              setIsLoading(false)
            })
          .catch((Err)=> {
            window.scrollTo(0,0)
            setIsLoading(false)
            setValidated(true);
            setIsError(true)
            
          })
        }
      };

   return(
      <div className='signup-form-container'>
      {isError ? 
          <div className='shadow signin-form-error bg-white rounded'>
            Your Organization's Email is already Exists      
          </div>
        :''}
      {isLoading ? <Loading/> : ''}        
       <Form className={isError ? "border-radius-0 shadow bg-white rounded signup-form" : "shadow bg-white rounded signup-form"} noValidate validated={validated} onSubmit={handleSubmit}>
           <h2>Sign Up</h2>
           <Form.Group controlId="formcname">
               <Form.Label>Organization Name</Form.Label>
               <Form.Control type="text" placeholder="Organization name" name='companyName' required/>
               <Form.Control.Feedback type="invalid">
                Please provide your organization name.
                </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group controlId="formemail">
               <Form.Label>Company Email Address</Form.Label>
               <Form.Control type="email" placeholder="Email address" name='email' required/>
               <Form.Control.Feedback type="invalid">
                Please provide an email address.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formtelno">
               <Form.Label>Telephone number</Form.Label>
               <Form.Control type="text" placeholder="Tel no." name='mobileNo' required/>
               <Form.Control.Feedback type="invalid">
                Please provide a telephone number.
                </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group controlId="formpwd">
                <Form.Label>Set Password</Form.Label>
                <Form.Control type="password" placeholder="set Password" name='password' required/>
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

            <div className='signup-btn-grp'>
              <Button type="submit" id="cacc">
                  Sign Up
              </Button>
            </div>
       </Form>
       </div>

   );
        
  
}

export default CreateAcc;