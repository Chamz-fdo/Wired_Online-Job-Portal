import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom'
import './singIn.css';
import {Form,Button} from 'react-bootstrap';
import authContext from './../context/authContext'

import {baseUrl} from './baseUrl'

function SignIn(){

    const history = useHistory();
    const [validated, setValidated] = useState(false);

    const AuthContext = useContext(authContext)

    const handleSubmit = (event) => {
      const form = event.currentTarget;

      event.preventDefault();
      
      if (form.checkValidity() === false) {
        event.stopPropagation();
      }

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

          })
        .catch((Err)=> {
          console.log(Err)
          localStorage.removeItem('token');
          setValidated(false);
        })

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
        <Form className="sii shadow p-3 mb-5 bg-white rounded" noValidate validated={validated} onSubmit={handleSubmit}>
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

            <Button type="submit" id="sii">
                Sign In
            </Button> 
        </Form>
    );
}

export default SignIn;