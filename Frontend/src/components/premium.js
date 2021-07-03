import React from 'react';
import CheckIcon from '@material-ui/icons/Check';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Plans(){
    return(
        <div>
            <h1>Our Plans</h1>
            <div className='premium-container row'>
            <div className='premium-plans'>
                <div className="flt shadow p-3 mb-5 bg-white rounded">
                    <h4>Create your own</h4>
                    <h2>FREE</h2>
                    <ListItem>
                      <ListItemIcon>
                      <CheckIcon color="primary" fontSize="large"/>
                      </ListItemIcon>
                      <ListItemText primary="1 single job posting" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                      <CheckIcon color="primary" fontSize="large"/>
                      </ListItemIcon>
                      <ListItemText primary="1 interview per month" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                      <CheckIcon color="primary" fontSize="large"/>
                      </ListItemIcon>
                      <ListItemText primary="Apllication alerts" />
                    </ListItem>
                    <Link to="/CreateAcc"><Button>Create Account</Button></Link>
                </div>
              </div>
              <div className='premium-plans'>
              <div className="flt shadow p-3 mb-5 bg-white rounded">
                  <h4>Go Premium<sub>/month</sub></h4>
                  <h2>$20<sup>.00</sup></h2>
                  <ListItem>
                    <ListItemIcon>
                    <CheckIcon color="primary" fontSize="large"/>
                    </ListItemIcon>
                    <ListItemText primary="Unlimited job posting" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                    <CheckIcon color="primary" fontSize="large"/>
                    </ListItemIcon>
                    <ListItemText primary="Unlimited interviewing" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                    <CheckIcon color="primary" fontSize="large"/>
                    </ListItemIcon>
                    <ListItemText primary="Additional interview features" />
                  </ListItem>
                  <Link to="/PaymentDetails"><Button>Buy Now</Button></Link>
              </div>
              </div>
            </div>
        </div>
    );
}

export default Plans;