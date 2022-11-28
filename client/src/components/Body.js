import React from 'react'
import { useState, useEffect } from 'react'
import Axios from 'axios'

function Body(){

    const[companyName, setcompanyName] = useState('')
    const[date, setDate] = useState('')
    const[companyList, setCompanyList] = useState([])
    const[newDate, setNewDate] = useState('')


    useEffect(()=> {
        Axios.get('http://localhost:3001/api/get').then((response)=> {
            setCompanyList(response.data)
        })
    })

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
        Axios.delete(`http://localhost:3001/api/delete/${company}`);
    };

    const updateDate = (company) => {
        Axios.put('http://localhost:3001/api/update', {
            companyName: company, 
            date:newDate
        });
        setNewDate("")
    };

    return(
        <div>
        <div class="vertical-menu">
        <form>
              <fieldset>
              <p className="legend">Add Company</p>
  <label for="company">Company Name:</label>
  <input type="text" name="companyName" onChange={(e) => {
    setcompanyName(e.target.value)
  }}/>

    <label for="start" id="date">Date Applied:</label>
    <input class="new-item" type="date" id="start" name="trip-start" value="2022-01-01"
           min="2022-01-01" max="2024-12-31" onChange={(e) => {
            setDate(e.target.value)
          }}/>
        <button className="btn-primary" id ="btn" onClick={submitCompany}>Add</button>
        <input className="btn-primary" type="reset" id="btn" value="Reset"></input>
          </fieldset>
            </form>
        </div>
        {companyList.map((val)=> {
            return <div className="card">
                <h3>{val.company_name}</h3>
                <p className="date-applied">{val.date_applied}</p>

                <button onClick={() => {deleteCompany(val.company_name)}}>Delete</button>
                <input id="update-input" type="text" onChange={(e) => {
                    setNewDate(e.target.value)
                }}></input>
                <button onClick={() => {updateDate(val.company_name)}}>Update</button>
            </div>
        })}
        </div>
    )
}

export default Body;