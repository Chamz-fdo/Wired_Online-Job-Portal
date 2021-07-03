import React, {useState} from 'react';
import {Form,Button} from 'react-bootstrap';
import UserHeader from './userheader';


function JoinMeeting(){
    const [validated, setValidated] = useState(false);
    


    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }

      

      setValidated(true);
    };

    return(
        <div>
        <UserHeader/>
        <Form className="shadow p-3 mb-5 bg-white rounded jmm" noValidate validated={validated} onSubmit={handleSubmit}>
            <h2>Join Meeting</h2>
            <Form.Group controlId="fomremail">
               <Form.Label>Meeting Id</Form.Label>
               <Form.Control type="email" placeholder="Email address" required/>
               <Form.Control.Feedback type="invalid">
                Enter the meeting Id.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formpwd">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" required/>
                <Form.Control.Feedback type="invalid">
                Enter the password.
                </Form.Control.Feedback>
            </Form.Group>

            <Button id="jml" type="submit">
                Join Meeting
            </Button> 
        </Form>
        </div>
    );
}

export default JoinMeeting;