import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom'
import {Form,Button} from 'react-bootstrap';
import authContext from './../context/authContext'

import {baseUrl} from './../baseUrl'
import Loading from './Loading'

function SignIn(){

    const [isLoading, setIsLoading] = useState(false);    
    const [isError, setIsError] = useState(false);    

    const history = useHistory();
    const [validated, setValidated] = useState(false);

    const AuthContext = useContext(authContext)

    const handleSubmit = (event) => {
      const form = event.currentTarget;

      event.preventDefault();
      
      if (form.checkValidity() === false) {
        event.stopPropagation();
        setValidated(true);        
      }
      else{
        setIsLoading(true)
        let userData = {};
        userData.email = form.email.value;
        userData.password = form.password.value;

        let old = JSON.stringify(userData)

        fetch(baseUrl +'users/login',{
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: old
        })
          .then((data) => data.json())
          .then((data)=>{
            console.log(data)
              localStorage.setItem('token', data.data.token);
              localStorage.setItem('accType', data.data.accType);
              localStorage.setItem('companyName', data.data.companyName);
              localStorage.setItem('companyEmail', data.data.user);

              AuthContext.login(data.data.token, data.data.accType, data.data.companyName, data.data.user)
              
              if(data.data.accType === 1){
                history.push('/userprofile')
              }
              else{
                history.push('/CompanyPrivate')      
              }   
              setIsLoading(false)
            })
          .catch((Err)=> {
            console.log(Err)
            localStorage.removeItem('token');
            setValidated(false);
            setIsLoading(false)
            setIsError(true)            
          })
        }

        // setTimeout(()=>{

        //   const token = localStorage.getItem('token');

        //   var bearer = 'token ' + token;
        //   fetch('http://localhost:3001/users/', {
        //           method: 'GET',
        //           headers: {
        //               'Authorization': bearer,
        //               'Content-Type': 'application/json'
        //           }
        //       })
        //         .then((data)=> data.json())
        //         .then((responseJson) => {
        //           console.log(responseJson)
        //       })
        //         .catch(error => {
        //           console.log(error)
        //       })

        // }, 2000)

    };

    return(
        <div className='signup-form-container'>    
        {isLoading ? <Loading/> : ''} 
        {isError ? 
          <div className='shadow signup-form-error bg-white rounded'>
            Your Email or Password is incorrect         
          </div>
        :''}
        <Form className={isError ? "shadow signup-form bg-white rounded border-radius-0" : "shadow margin-10vh signup-form bg-white rounded"} noValidate validated={validated} onSubmit={handleSubmit}>
            <h2>Sign In</h2>
            <Form.Group controlId="fomremail">
               <Form.Label>Email Address</Form.Label>
               <Form.Control name='email' type="email" placeholder="Email address" required/>
               <Form.Control.Feedback type="invalid">
                Enter the username.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formpwd">
                <Form.Label>Password</Form.Label>
                <Form.Control name='password' type="password" placeholder="Password" required/>
                <Form.Control.Feedback type="invalid">
                Enter the password.
                </Form.Control.Feedback>
            </Form.Group>

            <div className='signup-btn-grp'>            
            <Button type="submit" id="sii">
                Sign In
            </Button> 
            </div>
        </Form>
        </div>
    );
}

export default SignIn;