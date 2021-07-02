import React, {useContext} from 'react';
import {Navbar,Nav,Button,FormControl,DropdownButton,Dropdown} from 'react-bootstrap';
import './headers.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import authContext from './../context/authContext';
import {useHistory,useLocation} from 'react-router-dom';
import {Link} from 'react-router-dom';
import slogo from '../navlogo.png';

function UserHeader(props){

  const history = useHistory();
  const location= useLocation();
  const AuthContext = useContext(authContext)

  const logoutHandler=()=>{

    AuthContext.logout()
    history.push('/')      
  
  }

    return(
        <Navbar className="nvb">
          <Navbar.Brand className="hhh"><Link to="/"><img id="logos" src={slogo} alt="Logo" /></Link></Navbar.Brand>
          <input type="text" disabled={location.pathname.includes('Apply/') ? true : false} value={props.searchVal} onChange={(event)=>{
            props.onChangeHandler(event.target.value)
          }} placeholder="Search job title, Company Name" className="search form-control" style={{height:'55px', marginRight:'20px'}}/>
          {props.company ?
            <Link to="/CreateJob"><Button>Create Job</Button></Link> 
          :''}
          <Nav className="mr-auto">
            <AccountCircleIcon className="picon" fontSize="large"/>
            <DropdownButton id="dropdown-basic-button" size="sm" title="My Account">
            {/* <Dropdown.Item><Link to="/userprofile">My Account</Link></Dropdown.Item> */}
              <Dropdown.Item href="#/action-1">Change profile picture</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>  
              <Dropdown.Item onSelect={logoutHandler}>Logout</Dropdown.Item>  
            </DropdownButton>          
          </Nav>        
        </Navbar>    
    );
}

export default UserHeader;