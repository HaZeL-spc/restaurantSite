import React, { useEffect, useState } from 'react';
import Template from '../components/Template'
import axios from 'axios'
import { Button, Modal } from 'react-bootstrap'
import CreateIngredient from '../components/CreateIngredient';

const Messages = () => {
  const [ preparedMess, setPreparedMess ] = useState({})
  const [show, setShow] = useState(false);
  const [ messClicked, setMessClicked ] = useState({})

  const handleClose = () => {
    setShow(false)
  }
  const handleShow = (mess) => {
    setShow(true)
    setMessClicked(mess)
  }

  const getMessages = async () => {
    const messages = await axios.get("http://127.0.0.1:8000/api/contact-list/")
    prepareMessages(messages.data)
  }

  const prepareMessages = (messages) => {
    let dictionary = {}
    messages.map(message => {
      let created_at = message.created_at
      const index_T = created_at.indexOf("T")
      let date = created_at.slice(0,index_T)
      
      if (!dictionary.hasOwnProperty(date)) {
        dictionary[date] = []
      } 
      dictionary[date].push(message)
    })
    setPreparedMess(dictionary)
  }

  useEffect(() => {
    getMessages()
  }, []) 

  console.log(preparedMess)

  return (
    <Template>
      <div className="container image-holder text-italy">
        {
          preparedMess &&
          Object.keys(preparedMess).map((key) => (
            <div className="row">
              <h1 className="admin-message-day-headline col-12">{key}</h1>
              {
                preparedMess[key].map(mess => (
                    <div 
                      style={{cursor:"pointer", minHeight: "150px"}} 
                      key={mess.id} 
                      className="card col-md-4 col-12 my-3" 
                      onClick={() => handleShow(mess)}
                    >
                      <h2>{mess.topic}</h2>
                      {
                        mess.message.length > 100 ?
                        <p>{mess.message.slice(0,100)}...</p> :
                        <p>{mess.message}</p>
                      }
                    </div>
                  )
                )
              }
            </div>
          
          ))
        }
      </div>
      <Modal className="text-italy" style={{top: "100px"}} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{messClicked.topic}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>{messClicked.message}</h5>
        </Modal.Body>
      </Modal>
    </Template>
  );
};

export default Messages;