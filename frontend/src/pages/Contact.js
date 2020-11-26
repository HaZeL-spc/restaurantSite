import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import {Link} from 'react-router-dom'
import Template from '../components/Template';
import axios from 'axios'

const Contact = () => {

  const [ textInputs, setTextInputs ] = useState({text: "", textarea: ""})
  const [ success, setSuccess ] = useState(false)

  const handleChange = (e) => {
    setTextInputs({...textInputs, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(textInputs)
    const textInput = document.querySelector('.text-input')
    const textAreaInput = document.querySelector('.message-input')

    if (!textInputs.text || !textInputs.textarea) {
      if (!textInputs.text) {
        textInput.style.border = "2px solid red"
      } else {
        textInput.style.border = "none"
      }
      if (!textInputs.textarea) {
        textAreaInput.style.border = "2px solid red"
      } else {
        textAreaInput.style.border = "none"
      }
      setSuccess(false)
    } else {
      textInput.style.border = "none"
      textAreaInput.style.border = "none"
      setSuccess(true)

      createMessage()
    }
  }

  const createMessage = async () => {
    var url = 'http://127.0.0.1:8000/api/contact-list/'
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

      let formData = new FormData()
      formData.append('topic', textInputs.text.toString())
      formData.append('message', textInputs.textarea.toString())

      await axios.post(url, formData, config)
        .then(res => {
          console.log(res)
        }).catch(error => {
          console.log(error)
        })
  }

  return (
    <Template > 
      <div className="image-holder d-flex justify-content-center">
        <form className="contact-form flex-column" onSubmit={handleSubmit}>
          <label className="text-italy text-left label-text">Temat</label>
            <input 
              value={textInputs.text}
              onChange={handleChange}
              name="text"
              type="text" 
              className="text-input text-italy"
              maxLength="40"
            />
          <label className="text-italy text-left label-text">Wiadomość</label>
          <textarea  
            value={textInputs.textarea}
            onChange={handleChange}
            name="textarea"
            className="message-input text-italy"
            rows="2"
            maxlength="400"
          >
          </textarea>
          {
            success &&
            <div className="alert alert-success success-message text-italy" role="alert">
             Wysłane!
            </div>
          }
          <button type="submit" className="btn btn-contact text-italy">Wyślij</button>
        
        </form>
      </div>
    </Template>
  );
};

export default Contact;