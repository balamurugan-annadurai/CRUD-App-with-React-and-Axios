import React, { useEffect, useReducer, useRef, useState } from 'react'
import axios from 'axios'
import { reducer } from './Reducers/UserDataReducer';
import Card from './Components/Card';
import './App.css'
import Context from './Mycontext/Context';

const App = () => {

  // Initializes state userData and dispatch function using useReducer hook with initial state and a reducer function for state management
  const [userDatas, dispatch] = useReducer(reducer, []);

  //Initializes isAdding state and setIsAdding state using useState hook and initial value false
  const [isAdding, setIsAdding] = useState(false);

  //Create reference and initialize to empty value
  const input1 = useRef('');
  const input2 = useRef('');
  const input3 = useRef('');
  const input4 = useRef('');

  //function to update user data
  const getUpdatedDatas = (updatedDatas, id) => {
    axios.put(`/${id}`, updatedDatas)
    dispatch({
      type: 'UPDATE',
      payload: updatedDatas,
      id
    })
  }

  //function to delete user data
  const DeleteUserData = (id) => {
    axios.delete(`/${id}`)
    dispatch({
      type: 'DELETE',
      id
    })
  }

  //function to add user data
  const addDatas = () => {
    setIsAdding(true);
  }

  //function to close add new user data pop-up
  const closeIcon = () => {
    setIsAdding(false);
  }

  //function to add new user data
  const addNewDatas = () => {
    setIsAdding(false);
    const newData = {
      name: input1.current.value,
      age: input2.current.value,
      emailID: input3.current.value,
      mobileNumber: input4.current.value
    }
    axios.post('/', newData).then(res => dispatch({
      type: 'ADD',
      payload: { ...newData, id: res.data.id }
    }));
  }

  //runs once on component mount's and fetch data's using axios
  useEffect(() => {
    axios.get('/').then(response => dispatch({
      type: 'GET',
      payload: response.data
    }))
  }, []);

  return (
    <Context.Provider value={{ getUpdatedDatas, DeleteUserData}}>
      <div className='container d-flex flex-column align-items-center'>
        {
          isAdding &&
          <div className="no-edit w-100 pop-up-container d-flex vh-100 align-items-center justify-content-center">
            <div className="">
              <div className="card-content custom">
                <span onClick={closeIcon} className='close-icon'><i className='bx bx-x-circle'></i></span>
                <input ref={input1} placeholder='Name' type="text" />
                <input ref={input2} placeholder='Age' type="text" />
                <input ref={input3} placeholder='Email' type="text" />
                <input ref={input4} placeholder='Mobile no' type="text" />
                <button onClick={addNewDatas} className='btn btn-success add-btn'>Add</button>
              </div>
            </div>
          </div>

        }
        <h2 className='title p-3'>User Datas <i onClick={addDatas} className='bx bxs-plus-circle addIcon'></i></h2>
        <div className="row w-100">
          {
            userDatas.map((userData, index) => (
              <Card key={index} userData={userData} />
            ))
          }
        </div>
      </div>
    </Context.Provider>
  )
}

export default App