import React, {useContext} from 'react';
import {Navbar,Nav,Button,FormControl,DropdownButton,Dropdown} from 'react-bootstrap';
import './headers.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import { Link, useHistory } from 'react-router-dom';
import navlogo from '../navlogo.png';
import authContext from './../context/authContext'


function CompanyHeader(){

  const history = useHistory();
  const AuthContext = useContext(authContext)

  const logoutHandler=()=>{

    AuthContext.logout()
    history.push('/')      
  
  }


    return(
        
        <Navbar className="nvb">
          <Navbar.Brand href="#home"></Navbar.Brand>
          <FormControl type="text" placeholder="Search job title, company name" className="search" />
          <Button href="#"><SearchIcon/>Search</Button>
          <Link to="/CreateJob"><Button>Create Job</Button></Link> 
          <Nav className="mr-auto">
          <AccountCircleIcon className="picon" fontSize="large"/>
          <DropdownButton id="dropdown-basic-button" size="sm" title="Your Account">
          {/* <Link to="/CompanyPrivate"><Dropdown.Item>My Account</Dropdown.Item></Link> */}
          <Dropdown.Item href="#/action-1">Change profile picture</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
          <Dropdown.Item onSelect={logoutHandler}>Logout</Dropdown.Item>
          </DropdownButton>
          </Nav>
        </Navbar>    
    );
}

export default CompanyHeader;