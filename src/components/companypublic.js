import React, {useState} from 'react';
import {Modal,Button} from 'react-bootstrap';
import './compnaypublic.css';
import UserHeader from './userheader';
import { Link } from 'react-router-dom';


function CompanyPublic(props){

  const [modalShow, setModalShow]=useState(false);

    function JobModal(item){
      console.log(item)
      return(
          <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title id="modal-title">
          {item.item.jobTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className="jb">Job description</h5>
          <p>
          {item.item.jobDescription}
          </p>
          <h5 className="jb">Qualification Required</h5>
          <p>
          {item.item.jobQualifications}
          </p>
          <Link to="/Apply"><Button>Apply</Button></Link>
        </Modal.Body>
      </Modal>
      );
  }

  function JobPosting(){
    if(props.jobDetails){
      const Data = props.jobDetails.map((item)=>{
        return(    
            <>
            <div className="jbm shadow p-3 mb-5 bg-white rounded" >
                <div>
                    <h4 style={{cursor:'pointer'}} onClick={() => {setModalShow(true) }} id="jobb">{item.jobTitle}</h4>
                </div>
                <Link to="/Apply"><Button id="apply">Apply</Button></Link>
            </div>
            <JobModal item={item}/>
        </>
        );
      })

      return(Data)
  }
  else{return(null)}
  }

    return(
        <div>
        <UserHeader onChangeHandler = {props.onChangeHandler} searchVal={props.searchVal}/>
        <h1>ABC Company</h1>
        <JobPosting />
        </div>
    );
}

export default CompanyPublic;