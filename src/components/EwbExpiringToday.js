import React, { useState, useEffect } from "react";
import { SERVER_URL, ACCESS_TOKEN } from "../config/config.js";
import Navbar from './Navbar'
import Titlebar from './Titlebar'
import './EwbExpiringToday.css'
import Table from './Table'
import {MdSkipNext} from 'react-icons/md'
import {BiSkipPrevious} from 'react-icons/bi'
import {BiRightArrow} from 'react-icons/bi'
import {BiLeftArrow} from 'react-icons/bi'
import Buttons from "./Buttons.js";
import moment from 'moment'
import Card from './Card'
import Background from "./Background.js";
const EwbExpiringToday = () => {
const [result,setResult]=useState([])
const [stopResult,setStopResult]=useState([])
const [refresh,setRefresh]=useState(false);
const [checkState, setCheckState] = useState([]);
var data=[]
useEffect(()=>{
  const fetchData = async () => {
    var response = await fetch(SERVER_URL+"/eway/db/", {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json",
        "Authorization":ACCESS_TOKEN
      },
      body:JSON.stringify({
        "paginate": {
          "number_of_rows": 100,
          "page_number": 1
        },
        "sort_fields": [
          {}
        ],
        "filter_fields": {"valid_upto":new Date().toLocaleDateString()+" 23:59:00","manually_stopped":0}
      })
    })

    data = await response.json();
    data = new Map(Object.entries(data.data))
    setResult(data)
    console.log("Here:",data,ACCESS_TOKEN,new Date().toLocaleDateString()+" 23:59:00")
    setCheckState(
      //console.log("eway:",[...data.values()])
      [...data.values()].map(eway => {   
        console.log("eway",eway)
      //data.data
      //checkState.map(eway=>{
        return {
          select: false,
          ewaybill_no: eway.ewaybill_no,
          ewb_date:eway.ewb_date,
          amount:eway.amount,
          consignor_place:eway.consignor_place,
          consignee_place:eway.consignee_place,
          consignor_name:eway.consignor_name,
          consignee_name:eway.consignee_name,
          cewb_no:eway.cewb_no,
          truck_number:eway.truck_number
        };
    })
    );
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
      "truck_number":""
    })
    
    const fieldsOfFilters = ["ewaybill_no","ewb_date","amount","consignor_place","consignee_place","consignor_name","consignee_name","cewb_no","truck_number"]
    useEffect(()=>{
      const fetchData = async () => {
        const response = await fetch(SERVER_URL+"/eway/db/", {
          method:"POST",          
          headers:{
            "Content-Type":"application/json",
            "Accept":"application/json",
            "Authorization":ACCESS_TOKEN
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
        data=await response.json()
        data = new Map(Object.entries(data.data))
        setResult(data)
        console.log("janvi_data",data,ACCESS_TOKEN)
        setCheckState(
          //console.log("eway:",[...data.values()])
          [...data.values()].map(eway => {   
            console.log("eway",eway)
          //data.data
          //checkState.map(eway=>{
            return {
              select: false,
              ewaybill_no: eway.ewaybill_no,
              ewb_date:eway.ewb_date,
              amount:eway.amount,
              consignor_place:eway.consignor_place,
              consignee_place:eway.consignee_place,
              consignor_name:eway.consignor_name,
              consignee_name:eway.consignee_name,
              cewb_no:eway.cewb_no,
              truck_number:eway.truck_number
            };
        })
        );
      }
      fetchData()
      
    },[nameField]);

    const handleChange = (e) => {
      setNameField({...nameField, [e.target.name]: e.target.value});
    }
    useEffect(()=>{
  
      
    },[refresh])
    const stop = () => {
  
      const fetchData = async () => {
        const rs = await fetch(SERVER_URL+"/eway/eway_bill_stop/", {
          method:"PUT",
          headers: {
            "Content-Type":"application/json",
              "Accept":"application/json",
              "Authorization":ACCESS_TOKEN
          },
          body:stopResult
        })
          const data = await rs.json();
          console.log("stop:",data,stopResult)
        }
          fetchData()
    }
      return (
        <div className='ewb-expiring-today'>
            <Titlebar />
            <Navbar />
    
            <div className='inner'>
    
              <Card />

              <div className='align-btns'>
                <Buttons name = "Refresh" onClick={()=>setRefresh(true)}/>
                <Buttons name = "Stop"  onClick={stop} />
              </div>
              
            <Background/>
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
                    value="all"
                    onChange={event => {
                      let checked = event.target.checked;
                      setCheckState(
                        checkState.map(data => {
                          data.select = checked;
                          if(data.select == true && !stopResult.includes(data.ewaybill_no))
                            setStopResult(stopResult=>[...stopResult,data.ewaybill_no])
                          else if(data.select==false && stopResult.includes(data.ewaybill_no))
                            setStopResult(stopResult=>[...stopResult.slice(data.ewaybill_no)])
                          console.log("stopResult:",stopResult,data.select)
                          return data;
                        })
                      );
                      console.log("jer:",checkState);
                    }}
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
                  {checkState.map(eway => {
                  return (
                  <tr className='heading-row' key={eway.ewaybill_no}>
                      <td>
                        <input type='checkbox' value={eway.ewaybill_no} 
                        onChange={event => {
                          let checked = event.target.checked;
                          console.log("jer:",checkState);
                          setCheckState(
                            checkState.map(data => {
                              if (eway.ewaybill_no === data.ewaybill_no) {
                                data.select = checked;
                                if(data.select == true && !stopResult.includes(data.ewaybill_no))
                                  setStopResult(stopResult=>[...stopResult,data.ewaybill_no])
                                else if(data.select==false && stopResult.includes(data.ewaybill_no))
                                  setStopResult(stopResult=>{return stopResult.filter(d=>d.ewaybill_no!==data.ewaybill_no)})
                                console.log("stopResult",stopResult)
                              }
                              return data;
                            })
                          );
                          console.log("jer:",checkState);
                        }}
                        checked={eway.select}
                        />
                      </td>
                      <td>{eway.ewaybill_no}</td>
                      <td>{eway.ewb_date}</td>
                      <td>{eway.amount}</td>
                      <td>{eway.consignor_place}</td>
                      <td>{eway.consignee_place}</td>
                      <td>{eway.consignor_name}</td>
                      <td>{eway.consignee_name}</td>
                      <td>{eway.cewb_no}</td>
                      <td>{eway.truck_number}</td>
                      <td>{"Expiring"}</td>
                    </tr>)
                  })}

            </tbody>
            </table>

            <div className='last-row'>
                <button><BiSkipPrevious className='table-icon1' /></button>
                <button><BiRightArrow className='table-icon2' /></button>
                <div>{result.length}</div>
                <button><BiLeftArrow className='table-icon3' /></button>
                <button><MdSkipNext className='table-icon4' /></button>
            </div>
            </div>
            </div>
            </div>
            
)
}

export default EwbExpiringToday