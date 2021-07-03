import React, {useState} from 'react';
import {Form,Button} from 'react-bootstrap';

function PaymentDetails(){
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
        <div className='signup-form-container'>
        <Form className="shadow signup-form bg-white rounded" noValidate validated={validated} onSubmit={handleSubmit}>
           <h2>Sign Up</h2>
           <Form.Group controlId="formcname">
               <Form.Label>Organization Name</Form.Label>
               <Form.Control type="text" placeholder="Organization name" required/>
               <Form.Control.Feedback type="invalid">
                Please provide your organization name.
                </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group controlId="formemail">
               <Form.Label>Company Email Address</Form.Label>
               <Form.Control type="email" placeholder="Email address" required/>
               <Form.Control.Feedback type="invalid">
                Please provide an email address.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formtelno">
               <Form.Label>Telephone number</Form.Label>
               <Form.Control type="text" placeholder="Tel no." required/>
               <Form.Control.Feedback type="invalid">
                Please provide a telephone number.
                </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group controlId="formpwd">
                <Form.Label>Set Password</Form.Label>
                <Form.Control type="password" placeholder="set Password" required/>
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
       </Form>

        <Form className="shadow signup-form bg-white rounded" noValidate validated={validated} onSubmit={handleSubmit}>
           <h2>Payment Details</h2>
           <Form.Group controlId="formname">
               <Form.Label>Name on Card</Form.Label>
               <Form.Control type="text" placeholder="Name on card" required/>
               <Form.Control.Feedback type="invalid">
                Please provide the name on card.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formtcardno">
               <Form.Label>Card number</Form.Label>
               <Form.Control type="text" placeholder="Card number" required/>
               <Form.Control.Feedback type="invalid">
                Please provide the credit card number.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formdexpdate">
               <Form.Label>Expiration Date</Form.Label>
               <Form.Control type="date" placeholder="Expiration date" required/>
               <Form.Control.Feedback type="invalid">
                Please provide the expiration date.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formcvc">
                <Form.Label>CVC</Form.Label>
                <Form.Control type="text" placeholder="CVC" required/>
                <Form.Control.Feedback type="invalid">
                Please provide the CVC.
                </Form.Control.Feedback>
            </Form.Group>

            <div className='signup-btn-grp'>
            <Button type="submit" id="cacc">
                Pay Now
            </Button>
            </div>

       </Form>
       </div>
       </div>

    );
}

export default PaymentDetails;