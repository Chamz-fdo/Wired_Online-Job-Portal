import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import Modal from 'react-bootstrap/Modal'
import { Document } from 'react-pdf';

const Applicants = (props) => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [resumeLink, setResumeLink] = useState(null)

  const columns = [
    {
        dataField: 'name',
        text: 'Name'
    },{
        text: 'Email',
        formatter: (rowContent, row)=>{
            let url = 'mailTo:' + row.email;
            return(
                <a href={url}>{row.email}</a>
            )
        }
    },{
        text: 'Telephone No.',
        formatter: (rowContent, row)=>{
            let url = 'tel:' + row.telno;
            return(
                <a href={url}>{row.telno}</a>
            )
        }
    },{
        text: 'Linkedin',
        formatter: (rowContent, row)=>{
            let url = 'https://www.' + row.linkedin;
            return(
                <a href={url} target="_blank" rel="noopener noreferrer">Linkedin</a>
            )
        }
    },{
        text: 'Portfolio',
        formatter: (rowContent, row)=>{
            let url = 'https://www.' + row.portfolio;
            return(
                <a href={url} target="_blank" rel="noopener noreferrer">Portfolio</a>
            )
        }
    },{
        text: 'Resume',
        formatter: (rowContent, row)=>{
            return(
              <a href={row.resume} target="_blank" rel="noopener noreferrer">CV</a>
            )
        }
    }
]

  const handleModal=(details)=>{
    if(details)
      setResumeLink(details.reume)
    else
      setResumeLink(null)

    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      <div>
        <Button onClick={()=>{props.setApplicantsDetails()}} className="btn">Back</Button>
      </div>
      <BootstrapTable keyField='id' data={ props.applicants } columns={ columns } />

      {resumeLink ?
        <Modal show={isModalOpen} onHide={()=>{handleModal(null)}} animation={true}>
          <Modal.Header closeButton>
            {/* <Modal.Title>{resumeLink.name}</Modal.Title> */}
          </Modal.Header>
          <Modal.Body><Document file={resumeLink}/></Modal.Body>
          <Modal.Footer>            
            <Button variant="primary" onClick={()=>{handleModal(null)}}>
              Okay
            </Button>
          </Modal.Footer>
        </Modal>
      :''}
    </>
  );
};

export default Applicants;