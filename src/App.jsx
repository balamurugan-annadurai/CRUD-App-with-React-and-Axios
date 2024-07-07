import React, { useEffect, useReducer, useRef, useState } from 'react'
import axios from 'axios'
import { reducer } from './Reducers/UserDataReducer';
import Card from './Components/Card';
import './App.css'
import Context from './Mycontext/Context';
const App = () => {
  const [userDatas, dispatch] = useReducer(reducer, []);
  const [isAdding, setIsAdding] = useState(false);

  const input1 = useRef('');
  const input2 = useRef('');
  const input3 = useRef('');
  const input4 = useRef('');

  const getUpdatedDatas = (updatedDatas, id) => {
    axios.put(`/${id}`, updatedDatas)
    dispatch({
      type: 'UPDATE',
      payload: updatedDatas,
      id
    })
  }

  const DeleteUserData = (id) => {
    axios.delete(`/${id}`)
    dispatch({
      type: 'DELETE',
      id
    })
  }

  const addDatas = () => {
    setIsAdding(true);
  }

  const closeIcon = () => {
    setIsAdding(false);
  }

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
          <div className="pop-up-container d-flex vh-100 align-items-center justify-content-center">
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
        <h2 className='title'>User Datas <i onClick={addDatas} className='bx bxs-plus-circle addIcon'></i></h2>
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