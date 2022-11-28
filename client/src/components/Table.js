import React from 'react'
import {MdEdit} from "react-icons/md"
import {AiFillDelete} from "react-icons/ai"
import { useState, useEffect } from 'react'
import{  BrowserRouter as Router, Link } from "react-router-dom"
import Axios from 'axios'

function Table(){

  const[companyName, setcompanyName] = useState('')
    const[date, setDate] = useState('')
    const[companyList, setCompanyList] = useState([])
    const[newDate, setNewDate] = useState('')
    const[newName, setNewName] = useState('')

    useEffect(()=> {
        Axios.get('http://localhost:3001/api/get').then((response)=> {
            setCompanyList(response.data)
        })
    });

    const submitCompany = () =>{
      Axios.post('http://localhost:3001/api/insert', {
          companyName: companyName, 
          date:date
      });
          
      setCompanyList([
          ...companyList, 
          {companyName: companyName, date: date},
      ])
  };

    const deleteCompany = (company) => {
      if(window.confirm("Are you sure that you want to delete that?"))
      {Axios.delete(`http://localhost:3001/api/delete/${company}`)};
  };

  const updateDate = (company) => {
      Axios.put('http://localhost:3001/api/update', {
          companyName: company, 
          date:newDate
      });
      setNewDate("")
  };

  const updateCompany = (date) => {
    Axios.put('http://localhost:3001/api/updateName', {
        companyName: newName, 
        date:date
    });
    setNewName("")
};

    return(
        <div>
            <form>
              <fieldset>
              <p className="legend">Add Company</p>
          <label for="company">Company Name:</label>
          <input type="text" name="companyName" onChange={(e) => {
            setcompanyName(e.target.value)
            }}/>
          
            <label for="start" >Date Applied:</label>
  <input class="new-item" type="date" id="start" name="trip-start" value="2022-01-01"
           min="2022-01-01" max="2024-12-31" onChange={(e) => {
            setDate(e.target.value)
          }}/>
          <button id="btn"className ="btn-primary" onClick={submitCompany}>Add</button>
          <input className="btn-primary" type="reset" id="btn" value="Reset"></input>
          </fieldset>
            </form>
        <table class = "content-table" id="invoice">
    <thead>
      <tr>
        <th>Id</th>
        <th>Company Name</th>
        <th>Date Applied</th>
        <th>Edit Company Name</th>
        <th>Edit Date</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {companyList.map((val, index)=> {
            return (
              <tr key={val.id}>
                <th scope="row">{index+1}</th>
                <td>{val.company_name}</td>
                <td>{val.date_applied}</td>
                <td><input id="update-input" type="text" onChange={(e) => {
                    setNewName(e.target.value)
                }}></input><MdEdit onClick={() => {updateCompany(val.date_applied)}}/></td>


                <td><input id="update-input" type="text" onChange={(e) => {
                    setNewDate(e.target.value)
                }}></input><MdEdit onClick={() => {updateDate(val.company_name)}}/></td>
                <td><AiFillDelete onClick={() => {deleteCompany(val.company_name);}}/></td>
              </tr>
            )
        })}
      
    </tbody>
  </table>
 
        </div>
    )
}






export default Table;