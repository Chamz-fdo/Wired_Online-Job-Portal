import React, {useContext} from 'react';
import {Navbar,Nav,Button,DropdownButton,Dropdown} from 'react-bootstrap';
import './headers.css';
import authContext from './../context/authContext'
import { Link } from 'react-router-dom';
import logo from '../logo.png';
import navlogo from '../navlogo.png';
import SearchIcon from '@material-ui/icons/Search';


function FrontPage(){

  const AuthContext = useContext(authContext)


    return(
        <div>
       
        <Navbar className="nvbb">
        <Navbar.Brand href="#home"></Navbar.Brand>
          
        <Nav className="mr-auto inup">
            <Link to="/Jobsearch"><Button id="js" variant="outline-primary"><SearchIcon/>Search Jobs</Button> </Link> 
            
            {AuthContext.token === null ? 
                <Link to="/signIn"><Button id="si" variant="outline-primary">Sign In</Button> </Link>     
            :
            AuthContext.accType == 1 ?
                <Link to="/userprofile"><Button id="si" variant="outline-primary">Dashboard</Button> </Link>     
            :
            AuthContext.accType == 2 ?
                <Link to="/companyPrivate"><Button id="si" variant="outline-primary">Dashboard</Button> </Link>     
            :
                <Link to="/signIn"><Button id="si" variant="outline-primary">Sign In</Button> </Link>     
            }

            <DropdownButton id="dropdown" variant="outline-primary" size="sm" title="Sign Up">
                <Dropdown.Item ><Link to="/Plans" className="dd">Organization</Link></Dropdown.Item>
                <Dropdown.Item><Link to="/SignUp" className="dd">Job Seeker</Link></Dropdown.Item>  
            </DropdownButton>          
        </Nav>
        
        </Navbar>  
        <body>
        <img id="logo" src={logo} alt="Logo" />
        </body>
      </div> 

    );
}

export default FrontPage;