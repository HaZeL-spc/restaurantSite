import React, {useState} from 'react';
import Template from './Template';
import { Button, Modal } from 'react-bootstrap'
import axios from 'axios'

const CreateIngredient = () => {
  const [show, setShow] = useState(false);
  const [ ingredientName, setIngredientName ] = useState('')

  const handleClose = () => {
    setShow(false)
    setIngredientName('')
  }
  const handleShow = (mess) => {
    setShow(true)
  }

  const saveIngredient = async () => {
    const create_ingredient = document.querySelector("#create-ingredient")
    if (ingredientName) {
      var url = "http://127.0.0.1:8000/api/ingredient-create/"
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
  
      let formData = new FormData()
      formData.append('name', ingredientName.toString())
  
      await axios.post(url, formData, config)
        .then(res => {
          setShow(false)
          create_ingredient.style.border = ""
        }).catch(error => {
          console.log(error)
        })
    } else {
      create_ingredient.style.border = "2px solid red"
    }
  }

  return (
    <div>
      <Modal className="text-italy" style={{top: "100px"}} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj nowy składnik</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2 className="text-center">Nazwa składnika</h2>
          <input 
            type="text" 
            className="text-input text-center w-100"
            id="create-ingredient"
            value={ingredientName}
            onChange={(e) => setIngredientName(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Anuluj
          </Button>
          <Button variant="success" onClick={saveIngredient}>Zapisz</Button>
        </Modal.Footer>
      </Modal>
      <button onClick={handleShow} className="btn btn-create-ingredient">Dodaj nowy składnik</button>
    </div>
  );
};

export default CreateIngredient;