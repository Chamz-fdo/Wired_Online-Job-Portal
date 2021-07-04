import React, {useState, useContext} from 'react';
import './App.css';
import { BrowserRouter, Route, Switch , Redirect} from "react-router-dom";

import SignupUser from './components/signUpUser';
import SignIn from './components/signIn';
import UserProfile from './components/UserProfile';
import CompanyPrivate from './components/companyPrivate';
import JoinMeeting from './components/joinMeeting';
import CreateAcc from './components/createacc';
import CreateJob from './components/createJob';
import Apply from './components/applyform'; 
import Plans from './components/premium';
import PaymentDetails from './components/paymentdetails';
import UserHeader from './components/userheader';
import FrontPage from './components/frontpage';
import Jobsearch from './components/searchjobs';
import Footer from './components/footer';
import Aboutus from './components/aboutus';

import authContext from './context/authContext'

import {baseUrl} from './baseUrl'

function App() {

  const [isLoading, setIsLoading] = useState(true);
  
  const [token, setToken] = useState(null);
  const [accType, setAccType] = useState(null)
  const [companyName, setCompanyName] = useState(null)
  const [companyEmail, setCompanyEmail] = useState(null)

  const [fetched, setFetched] = useState(false)

  const AuthContext = useContext(authContext)

  const [jobDetails, setJobDetails] = useState([])
  const [searchVal , seTSearchVal] = useState('')
  const [searchVal2 , seTSearchVal2] = useState('')

  const [isChanged, setIsChanged] = useState(false)
  const [selectedJobDetails, setSelectedJobDetails] = useState()
  let routes

  // React.useEffect(()=>{
  //     if(!jobDetails.length && token){

  //         var bearer = 'token ' + token;

  //         fetch('http://localhost:3001/Wired/jobs', {
  //                 method: 'GET',
  //                 headers: {
  //                     'Authorization': bearer,
  //                     'Content-Type': 'application/json'
  //                 }
  //             })
  //             .then((data)=>data.json())
  //             .then((data)=>{
  //                 setJobDetails(data)})
  //             .catch((err)=> {
  //                 localStorage.removeItem('token');
  //                 localStorage.removeItem('accType');
  //                 localStorage.removeItem('companyName');
  //                 localStorage.removeItem('companyEmail');
  //                 setToken(null)
  //                 setAccType(null)
  //                 setCompanyName(null)
  //                 setCompanyEmail(null)
  //             })
  //     }
  //     if(!fetched){

  //       if(localStorage.getItem('token'))
  //         setToken(localStorage.getItem('token'))

  //       if(localStorage.getItem('accType'))
  //         setAccType(localStorage.getItem('accType'))

  //       if(localStorage.getItem('companyName'))
  //         setCompanyName(localStorage.getItem('companyName'))
        
  //       if(localStorage.getItem('companyEmail'))
  //         setCompanyName(localStorage.getItem('companyEmail'))

  //       setFetched(true)
  //     }
  // })

  React.useEffect(()=>{                  
    RefreshJobs()
  },[])

  const RefreshJobs=()=>{
    fetch(baseUrl+ 'Wired/jobs/getAll')
        .then((data)=>data.json())
        .then((data)=>{setJobDetails(data)})  
  }

  const login =(tkn, no, name,email)=>{
    setToken(tkn)
    setAccType(no)
    setCompanyName(name)
    setCompanyEmail(email)
  }

  const logout =()=>{
    setAccType(null)
    setCompanyName(null)
    setToken(null)
    setCompanyEmail(null)


    localStorage.removeItem('token');
    localStorage.removeItem('accType');
    localStorage.removeItem('companyName');
    localStorage.removeItem('companyEmail');
  }

  function onChangeHandler(name){
    seTSearchVal(name)
  }

  function onChangeHandler2(name){
    seTSearchVal2(name)
  }


  if(token != null && accType != null){
    routes = (
        <Switch>
            {accType == 1 ? 
              <Route path="/userprofile">
                <div>
                  <UserHeader searchVal={searchVal} onChangeHandler={onChangeHandler}/>
                  <UserProfile searchVal={searchVal} onChangeHandler={onChangeHandler} RefreshJobs={RefreshJobs} selectedJob={setSelectedJobDetails} jobDetails={jobDetails.length ? jobDetails.filter((item)=> item.jobTitle.toLowerCase().includes(searchVal.toLowerCase()) || item.companyName.toLowerCase().includes(searchVal.toLowerCase())) : null }/>
                  <div style={{clear:'both',position:"fix", bottom:"0px"}}>
                    <Footer/>
                  </div>
                </div>
              </Route>
            :
            accType == 2 ?
              <Route path="/CompanyPrivate" >
                <div>
                  <CompanyPrivate isChanged={isChanged} setIsChanged={setIsChanged} />
                  <div style={{clear:'both'}}>
                  <Footer/>
                  </div>
                </div>
              </Route>
            :''}

            {accType == 2 ? 
              <Route path="/CreateJob" component={CreateJob} />
            :
              ''
            }

            <Route exact path="/" component={FrontPage} />
            <Route path="/JoinMeeting" component={JoinMeeting} />
            <Route path="/Apply/:jobId" component={({match})=><Apply id={match.params.jobId} selectedJob={selectedJobDetails}/>}/>
            <Route path="/Jobsearch" >
              <Jobsearch setJobDetails={setJobDetails} guest={false}/>
              <Footer/>              
            </Route>  
            <Route path='/aboutus' component={Aboutus} />             
            {accType == 1 ?   
                <Redirect to='/userprofile'/>
                
            :
            accType == 2 ?
              <Redirect to='/companyPrivate'/>
            :
              ''
            }

        </Switch>
    )
  }

  else{
    routes = (
        <Switch>
            <Route path="/signIn" component={SignIn} />
            <Route path="/footer" component={Footer}/>
            <Route path="/SignUp" component={SignupUser} />
            <Route exact path="/" component={FrontPage} />
            <Route path="/CreateAcc" component={()=> <CreateAcc setIsChanged={setIsChanged} />} />
            <Route path="/Plans" component={Plans} />
            <Route path="/PaymentDetails" component={PaymentDetails} /> 
            <Route path="/Jobsearch">  
              <Jobsearch guest={true} setJobDetails={setJobDetails} />
              <Footer/>
            </Route>
            <Route path='/aboutus' component={Aboutus} />             
            <Redirect to='/'/>            
        </Switch>
    )
  }

  return (
    <authContext.Provider value={{
      token: token,
      accType: accType,
      companyName: companyName,
      companyEmail: companyEmail,
      login: login,
      logout: logout,
    }}>
      <div>
        <BrowserRouter>
          
          {routes}
          {/* <Route path="/Companyheader" component={CompanyHeader} /> */}
          {/* <Route path="/userheader" component={UserHeader} /> */}
      
        </BrowserRouter>
      </div>
    </authContext.Provider>

  );
}

export default App;
