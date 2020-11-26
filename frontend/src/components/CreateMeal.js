import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Template from '../components/Template'
import CreateIngredient from './CreateIngredient';
import DeleteIngredient from './DeleteIngredient';

function slugify(string) {
  return string
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

const CreateMeal = () => {
  const [ ingredients, setIngredients ] = useState([])
  // const [ checkedBoxes, setCheckedBoxes ] = useState([])
  const [ postData, setPostData ] = useState({
    name:"",
    ingredients: []
  })
  const [ postImage,setPostImage ] = useState(null)

  useEffect(() => {
    getIngredients()
  }, [])

  const getIngredients = async () => {
    const ing_temp = await axios.get("http://127.0.0.1:8000/api/ingredient-list/")

    var ingredients_temp = [];
    for (let i = 0; i < ing_temp.data.length; i++) {
      ingredients_temp.push({
        id: ing_temp.data[i].id,
        name: ing_temp.data[i].name,
        checked:false
      })
    }
    setIngredients(ingredients_temp)
  }

  const postMeal = async (e) => {
    e.preventDefault()

    var url = 'http://127.0.0.1:8000/api/meal-create/'
    const config = {
      headers: {
        'Content-Type': 'multipa rt/form-data'
      }
    }
    let postData_temp = postData
    if (postData_temp.ingredients && postData_temp.name && postImage) {
      for (let i = 0; i < ingredients.length; i++) {
        if (ingredients[i].checked) {
          postData_temp.ingredients.push(ingredients[i])
        }
      }

      let formData = new FormData()
      formData.append('name', postData_temp.name.toString())
      formData.append('ingredients', JSON.stringify(postData_temp.ingredients))
      formData.append('image', postImage[0])
      formData.append('slug', slugify(postData_temp.name.toString()))

      console.log(postData_temp.name.toString())

      await axios.post(url, formData, config)
        .then(res => {
          console.log(res)
          resetInput()
        }).catch(error => {
          console.log(error)
        })
    }
  }

  const resetInput = () => {
    setPostData({
      name:"",
      ingredients: []
    })
    setPostImage(null)
    
    var ingredients_temp = [];
    for (let i = 0; i < ingredients.length; i++) {
      ingredients_temp.push({...ingredients[i], checked:false})
    }

    console.log(ingredients_temp)
    setIngredients(ingredients_temp)
  }

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setPostImage(e.target.files)
    } else if (e.target.name === 'ingredient') {
      let items = [...ingredients]
      const element = ingredients[e.target.id]
      element.checked = !element.checked
      items[e.target.id] = element
      setIngredients(items)
    } else {
      setPostData({
        ...postData, 
        [e.target.name]: e.target.value
      })
    }
  }


  return (
    <Template>
      <div className="image-holder text-italy">
        <form className="create-meal-form d-flex flex-column" onSubmit={postMeal}>
          <h3>1) Tytuł dania</h3>
          <input 
            className="text-input"
            style={{width: "100%"}}
            type="text"
            id="text-name"
            onChange={handleChange}
            value={postData.name}
            name="name"
          />
          <h3>2) Składniki</h3>
          {
            ingredients.length > 0 &&
            ingredients.map((ing, index) => {
              return (
                <div key={index} className="create-meal-ingredient">
                  <input 
                    name="ingredient"
                    id={index}
                    type="checkbox"
                    checked={ing.checked}
                    onChange={handleChange}
                  />
                  <label className="create-meal-ingredient-name">{ing.name}</label> 
                    <DeleteIngredient 
                      ing={ing} 
                      getIngredients={getIngredients}
                    />
                </div>
              )
            }) 
          }
          <CreateIngredient getIngredients={getIngredients}/>
          <h3>3) Zdjecie</h3>
          <input
            accept="image/*"
            id="post-image"
            className="create-meal-input-image"
            onChange={handleChange}
            name="image"
            type="file"
          />
          <div className="d-flex justify-content-center">
            <input 
              className="btn btn-create-meal"
              type="submit"
            />
          </div>
        </form>
      </div>
    </Template>
  );
};

export default CreateMeal;