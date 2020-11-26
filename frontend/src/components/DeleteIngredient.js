import React, {useState} from 'react';
import { Button, Modal } from 'react-bootstrap'
import axios from 'axios'

const DeleteIngredient = ({ing, getIngredients}) => {
  const [show, setShow] = useState(false);
  const [ ingredientName, setIngredientName ] = useState('')

  const handleClose = () => {
    setShow(false)
  }
  const handleShow = (ing) => {
    setShow(true)
    setIngredientName(ing.name)
  }

  const deleteIngredient = async (e) => {
    e.preventDefault()

    var url = `http://127.0.0.1:8000/api/ingredient-delete/${ing.id}/`
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    await axios.delete(url, config)
      .then(res => {
        console.log(res)
        setShow(false)
        getIngredients()
      }).catch(error => {
        console.log(error)
      })
  }

  return (
    <div style={{float:"right", cursor:"pointer"}}>
      <Modal className="text-italy" style={{top: "100px"}} show={show} onHide={handleClose}>
        <Modal.Body>
          <Modal.Title>Czy chcesz usunąć składnik z twojej listy składników?</Modal.Title>
          <Modal.Title style={{fontSize: "40px"}}>
            <ins>{ingredientName}</ins>
          </Modal.Title>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Anuluj
          </Button>
          <Button variant="success" onClick={deleteIngredient}>Zapisz</Button>
        </Modal.Footer>
      </Modal>
      <svg 
        onClick={() => handleShow(ing)}
        width="1em" 
        height="1em" 
        viewBox="0 0 16 16" 
        className="bi bi-trash" 
        fill="currentColor" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
      </svg>
    </div>
  );
};

export default DeleteIngredient;