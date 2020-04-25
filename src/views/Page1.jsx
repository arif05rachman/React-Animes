import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
export default () => {
  const dispatch = useDispatch()
  const counter = useSelector(state => state.listAnime.counter);
  const addCounter = () => {
    dispatch({type: "ADD_COUNTER", payload: {counter: counter+1}})
  }
  useEffect(() => {
    return () => {
      alert('success')
    }
  }, [])
  return (
    <div className="bg-light">
      <h1>Page 1</h1>
      <div>{counter}</div>
      <button onClick={addCounter}>update counter</button>
      <Link to="/page2">to page 2</Link>
    </div>
  );
}