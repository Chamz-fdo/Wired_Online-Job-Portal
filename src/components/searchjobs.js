import React,{ useState, useContext, useEffect} from 'react';
import {Navbar,Nav,Card,Button,DropdownButton,Dropdown} from 'react-bootstrap';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import slogo from '../navlogo.png';

import Jobs from './jobs'
import {baseUrl} from './../baseUrl'
import Loading from './Loading'

function Jobsearch(props){
    
    const [isLoading, setIsLoading] = useState(true);    
    const [jobDetails, setJobDetails] = useState()
    const [searchVal , seTSearchVal] = useState('')

    useEffect(()=>{
        if(!jobDetails){
            fetch(baseUrl+ 'Wired/jobs/getAll')
                .then((data)=>data.json())
                .then((data)=>{
                    setJobDetails(data)
                    setTimeout(()=>{
                        setIsLoading(false)                           
                    },1000)
                })  
        }            
    
    },[])

    function onChangeHandler(name){
        seTSearchVal(name)
    }

    return(
    <div>
    {isLoading ? <Loading/> : ''}
    <Navbar className="nvbjs navbar-custom">
        <Navbar.Brand><Link to="/"><img id="logos" src={slogo} alt="Logo" /></Link></Navbar.Brand>
        
        {props.guest ?
            <Nav className="mr-auto navbar-buttons">
                <Link to="/signIn"><Button id="jbbtn">Sign In</Button> </Link>     
                <DropdownButton size="sm" title="Sign Up" id="jbbtn">
                    <Dropdown.Item ><Link to="/Plans" className="dd">Organization</Link></Dropdown.Item>
                    <Dropdown.Item><Link to="/SignUp" className="dd">Job Seeker</Link></Dropdown.Item>  
                </DropdownButton>          
            </Nav>
        :''}
        
        </Navbar>  
    
    <Navbar className='navbar-custom'>    
    <input type="text" value={searchVal} onChange={(event)=>{
        onChangeHandler(event.target.value)
        }} placeholder="Search job title, Company Name" className="search form-control" style={{height:'55px'}}/>
    </Navbar>
    <div className='text-center' style={{fontSize:'20px', fontWeight:'600'}}>Sign up or sign in to apply</div>
    <div className='search-jobs-container'>
        <Jobs mode='guest' jobs={jobDetails ? jobDetails.filter((item)=> item.jobTitle.toLowerCase().includes(searchVal.toLowerCase()) || item.companyName.toLowerCase().includes(searchVal.toLowerCase())) : [] }/>
    </div>
    </div>  
    );
}

export default Jobsearch;
