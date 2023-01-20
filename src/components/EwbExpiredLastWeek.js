import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../config/config.js";
import Navbar from './Navbar'
import Titlebar from './Titlebar'
import './EwbExpiringToday.css'
import Table from './Table'
import {MdSkipNext} from 'react-icons/md'
import {BiSkipPrevious} from 'react-icons/bi'
import {BiRightArrow} from 'react-icons/bi'
import {BiLeftArrow} from 'react-icons/bi'
import moment from 'moment'
import Content from './Content'
const token=JSON.parse(localStorage.getItem('login'))
const EwbExpiredLastWeek = () => {
const [result,setResult]=useState({})
  useEffect(()=>{
    const fetchData = async () => {
      var response = await fetch(SERVER_URL+"/eway/db/", {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Accept":"application/json",
          "Authorization":"Bearer "+token.store
        },
        
      })

      const data = await response.json();
      setResult(data)
      console.log("Here:",data,token.store)
    }
    fetchData();
  },[]);
   /*{
        Header: "Extended Times",
        accessor: "extended_times",
        width: "50px",
        minWidth: "10px",
        canFilter: true,
      },*/
      //const is_expired={accessor: valid_to}
      const columns = React.useMemo(
        () => [
            {
                Header: "Number",
                accessor: "ewaybill_no",
                width: "100px",
                minWidth: "10px",
                canFilter: true,
            },
    
            {
                Header: "Date",
                accessor: "ewb_date",
                width: "100px",
                minWidth: "10px",
                canFilter: true,
            },
    
            {
              Header: "Amount",
              accessor: "amount",
              width: "100px",
              minWidth: "10px",
              canFilter: true,
          },
    
          {
            Header: "From",
            accessor: "consignor_place",
            width: "100px",
            minWidth: "10px",
            canFilter: true,
          },
    
          {
            Header: "To",
            accessor: "consignee_place",
            width: "100px",
            minWidth: "10px",
            canFilter: true,
          },
    
          {
            Header: "Consignor",
            accessor: "consignor_name",
            width: "100px",
            minWidth: "10px",
            canFilter: true,
          },
    
          {
            Header: "Consignee",
            accessor: "consignee_name",
            width: "100px",
            minWidth: "10px",
            canFilter: true,
          },
    
          {
            Header: "CEWB",
            accessor: "cewb_no",
            width: "100px",
            minWidth: "10px",
            canFilter: true,
          },
    
          {
            Header: "Truck No",
            accessor: "truck_number",
            width: "100px",
            minWidth: "10px",
            canFilter: true,
          },
    
          {
            Header: "Status",
            accessor:"status",
            //text: "Expired Last Week",
            width: "100px",
            minWidth: "10px",
            canFilter: true,
          },
            
        ],
        []
    );

    const [nameField,setNameField] = useState({
      "ewaybill_no":"",
      "ewb_date":"",
      "amount":"",
      "consignor_place":"",
      "consignee_place":"",
      "consignor_name":"",
      "consignee_name":"",
      "cewb_no":"",
      "truck_number":"",
      "status":"Expired"
    })

    const fieldsOfFilters = ["ewaybill_no","ewb_date","amount","consignor_place","consignee_place","consignor_name","consignee_name","cewb_no","truck_number","status"]

    useEffect(()=>{
      const fetchData = async () => {
        const response = await fetch(SERVER_URL+"/eway/db/", {
          method:"POST",          
          headers:{
            "Content-Type":"application/json",
            "Accept":"application/json",
            "Authorization":"Bearer "+token.store
          },
          body:JSON.stringify({
            "paginate": {
              "number_of_rows": 100,
              "page_number": 1
            },
            "sort_fields": [
              {}
            ],
            "filter_fields": nameField
          })
        })
        const data = await response.json();
        setResult(data)
        console.log("janvi_data",data,token.store)
      }
      fetchData()
    },[nameField]);

    const handleChange = (e) => {
      setNameField({...nameField, [e.target.name]: e.target.value});
    }
      return (
        <div className='ewb-expiring-today'>
            <Titlebar />
            <Navbar />
    
            <div className='inner'>
    
              <Content />
    
              <div className='wrapper'>
        <table className='table'>
            <thead>
                <tr className='table-heading'>
                    <th colspan = "4" className='first-heading'>Ewb Details</th>
                    <th colspan = "7" className='second-heading'>Consignment Details</th>
                </tr>
                
            <tr className='heading-row'>
                <th>
                </th>

                {columns.map((Name)=> <th className='heading-col'>{Name.Header}</th>)}
            </tr>

            <tr className='search-row'>
                <td>
                <input 
                    type='checkbox'
                    
                    />
                </td>
            {
              fieldsOfFilters.map((Name)=> 
              <td className='search-col'> <input name={Name} onChange={handleChange} placeholder = "Search" className='search-input'/></td>
            )}
            </tr>
            </thead>
            <tbody>
            {/*moment({hours:0}).diff(moment(eway.valid_upto,"D-MM-YYYY"),"days")>=7 && moment({hours:0}).diff(moment(eway.valid_upto,"D-MM-YYYY"),"days")<=14?*/}
                  {result["data"] && result["data"].map(eway => {
                  return (
                  <tr className='heading-row'>
                      <td>
                        <input type='checkbox' />
                      </td>
                      <td>{eway.ewaybill_no}</td>
                      <td>{new Date(eway.ewb_date).toLocaleString().split(",")[0]}</td>
                      <td>{eway.amount}</td>
                      <td>{eway.consignor_place}</td>
                      <td>{eway.consignee_place}</td>
                      <td>{eway.consignor_name}</td>
                      <td>{eway.consignee_name}</td>
                      <td>{eway.cewb_no}</td>
                      <td>{eway.truck_number}</td>
                      <td>{"Expired"}</td>
                    </tr>)
                  })}

            </tbody>
            </table>

            <div className='last-row'>
                <button><BiSkipPrevious className='table-icon1' /></button>
                <button><BiRightArrow className='table-icon2' /></button>
                <div>1</div>
                <button><BiLeftArrow className='table-icon3' /></button>
                <button><MdSkipNext className='table-icon4' /></button>
            </div>
            </div>
            </div>
            </div>
)
}

export default EwbExpiredLastWeek