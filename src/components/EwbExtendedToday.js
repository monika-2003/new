import React, { useState, useEffect } from "react";
import { SERVER_URL, ACCESS_TOKEN, USE_OVERLAY } from "../config/config.js";
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
import LoadingOverlay from "react-loading-overlay";
const EwbExtendedToday = ({sessionObject})  => {
const [stopResult,setStopResult]=useState([])
let date=new Date()
let dateMDY = `${date.getFullYear()}-${(date.getMonth() + 1)<10?('0'+(date.getMonth() + 1)):date.getMonth() + 1}-${date.getDate()<10?('0'+(date.getDate())):date.getDate()}`; 
 
const [checkState, setCheckState] = useState([]);
const [overlay, setOverlay] = useState(false);
var data=[]

var ACCESS_TOKEN = null

const fetchData = async () => {
  ACCESS_TOKEN = "Bearer "+localStorage.getItem('login')
  var response = await fetch(SERVER_URL+"/eway/db/", {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Accept":"application/json",
      "Authorization":ACCESS_TOKEN
    },
    body:JSON.stringify({
      "current_user":1,
      "paginate": {
        "number_of_rows": 100,
        "page_number": 1
      },
      "sort_fields": [
        {}
      ],
      "filter_fields": {"last_extended":dateMDY}
    })
  })

  data = await response.json();
  console.log("datadata", data)
  if (!("data" in data)){
    return;
  }
  data = new Map(Object.entries(data.data))
  console.log("Here:",data,ACCESS_TOKEN,dateMDY)
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
        valid_upto:eway.valid_upto,
        last_extended:eway.last_extended,
        extended_times:eway.extended_times,
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

useEffect(()=>{

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
              Header: "Valid Upto",
              accessor: "valid_upto",
              width: "100px",
              minWidth: "10px",
              canFilter: true,
            },

            {
              Header: "Last Extended",
              accessor: "last_extended",
              width: "100px",
              minWidth: "10px",
              canFilter: true,
            },

            {
              Header: "Extended Times",
              accessor: "extended_times",
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
      "valid_upto":"",
      "last_extended":dateMDY,
      "extended_times":"",
      "amount":"",
      "consignor_place":"",
      "consignee_place":"",
      "consignor_name":"",
      "consignee_name":"",
      "cewb_no":"",
      "truck_number":""
    })
    
    const fieldsOfFilters = ["ewaybill_no","ewb_date","valid_upto","last_extended","extended_times","amount","consignor_place","consignee_place","consignor_name","consignee_name","cewb_no","truck_number"]
    
    useEffect(()=>{

      fetchData()
      
    },[nameField]);

    const handleChange = (e) => {
      setNameField({...nameField, [e.target.name]: e.target.value});
    }

    const stop = async (e) => {
      ACCESS_TOKEN = "Bearer "+localStorage.getItem('login');
      setOverlay(true)
      console.log("array",stopResult )
      const rs = await fetch(SERVER_URL+"/eway/eway_bill_stop/", {
        method:"PUT",
        headers: {
          "Content-Type":"application/json",
            "Accept":"application/json",
            "Authorization":ACCESS_TOKEN
        },
        body:JSON.stringify(stopResult)
      })
      const data = await rs.json();
      console.log("stop:",data,stopResult)
      setOverlay(false)
    }
      return (
        <div className='ewb-expiring-today'>
          {USE_OVERLAY && (
          <LoadingOverlay
            active={overlay}
            spinner
            text="Loading your content..."
            styles={{
              wrapper: {
                // width: '400px',
                // height: '400px',
                overflow: true ? "hidden" : "scroll",
              },
            }}
          ></LoadingOverlay>
          )}
            <Titlebar sessionObject={sessionObject}/>
            {/*<Navbar />*/}
    
            <div className='inner'>
    
              <Card />

              <div className='align-btns'>
                <button className='btn' onClick={stop}>Stop</button>
              </div>
              
            <Background/>
              <div className='wrapper'>
        <table className='table'>
            <thead>
                <tr className='table-heading'>
                    <th colspan = "6" className='first-heading'>Ewb Details</th>
                    <th colspan = "8" className='second-heading'>Consignment Details</th>
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
              <td className='search-col'> <input name="status" onChange="" placeholder = "Search" className='search-input'/></td>
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
                      <td>{eway.ewb_date!=null?eway.ewb_date.slice(0,10).split('-').reverse().join("/"):"-"}</td>
                      <td>{eway.valid_upto!=null?eway.valid_upto.slice(0,10).split('-').reverse().join("/"):"-"}</td>
                      <td>{eway.last_extended!=null?eway.last_extended.slice(0,10).split('-').reverse().join("/"):"-"}</td>
                      <td>{eway.extended_times}</td>
                      <td>{eway.extended_times}</td>
                      <td>{eway.amount}</td>
                      <td>{eway.consignor_place}</td>
                      <td>{eway.consignee_place}</td>
                      <td>{eway.consignor_name}</td>
                      <td>{eway.consignee_name}</td>
                      <td>{eway.cewb_no}</td>
                      <td>{eway.truck_number}</td>
                      <td>{"Extended"}</td>
                    </tr>)
                  })}

            </tbody>
            </table>

            <div className='last-row'>
                <button><BiSkipPrevious className='table-icon1' /></button>
                <button><BiRightArrow className='table-icon2' /></button>
                <div>{checkState.length}</div>
                <button><BiLeftArrow className='table-icon3' /></button>
                <button><MdSkipNext className='table-icon4' /></button>
            </div>
            </div>
            </div>
            </div>
            
)
}

export default EwbExtendedToday