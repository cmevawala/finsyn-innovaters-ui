import { useState, useEffect } from 'react'
import './App.css'

function App() {
  useEffect(() => {
    fetch("http://localhost:5000/response_get_structured_data_insights")
      .then(response => response.json())
      .then(data => console.log(data));
  }, []);
  
  return (
    <>
     <h1>Hello World</h1>
    </>
  )
}

export default App
