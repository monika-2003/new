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
import ReportTable from "./ReportTable";
import Card from './Card'
import Background from "./Background.js";
const EwbExpiringToday = ({sessionObject}) => {
  const [checkedList, setCheckedList] = React.useState([]);
const [result,setResult]=useState([])
const [stopResult,setStopResult]=useState([])
const [loading, setLoading] = React.useState(false);
const [pageCount, setPageCount] = React.useState(0);
let date=new Date()
let dateMDY = `${date.getFullYear()}-${(date.getMonth() + 1)<10?('0'+(date.getMonth() + 1)):date.getMonth() + 1}-${date.getDate()<10?('0'+(date.getDate())):date.getDate()}`+" 23:59:00"; 
const fetchIdRef = React.useRef(0);
const [checkState, setCheckState] = useState([]);
const [data, setData] = React.useState([]);
const handleSelectAll = () => {
  let tempChecked = [];
  data.forEach((row) => {
      tempChecked.push(row.eway_bill_no);
  })
  setCheckedList(tempChecked);
}
const isChecked = (row) => {
  const val = row[0].value;
  return (checkedList.indexOf(val) > -1);
}
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
        "filter_fields": {valid_upto:dateMDY,manually_stopped:0}
      })
    })

    data = await response.json();
    console.log("datadata", data)
    if (!("data" in data)){
      return;
    }
    data = new Map(Object.entries(data.data))
    setResult(data)
    console.log("Here:",data,dateMDY,(new Date()).toLocaleDateString(),(new Date().getFullYear().toString() + '-' + new Date().getMonth() + 1<10?'0'+(new Date().getMonth() + 1).toString():(new Date().getMonth() + 1).toString() + '-' + (new Date().getDate()).toString())+" 23:59:00")
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

const handleCheckboxChange = (row) => {
  const val = row[0].value;
  const ind = checkedList.indexOf(val);
  let tempChecked = [...checkedList];
  if(ind > -1) {
      tempChecked.splice(ind, 1);
  }
  else {
      tempChecked.push(val);
  }
  setCheckedList(tempChecked);
}

const handleDeselectAll = () => {
  setCheckedList([]);
}

const getSelectAllValue = () => {
  const isAllSelected = checkedList.length == data.length;
  return isAllSelected;
}

const fetchData = React.useCallback(
  async ({ pageSize, pageIndex, sortBy, customFilters }) => {
    // This will get called when the table needs new data
    // You could fetch your data from literally anywhere,
    // even a server. But for this example, we'll just fake it.

    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current;
    console.log("12323", sortBy, customFilters, fetchId);
    // Set the loading state
    setLoading(true);

    if (fetchId === fetchIdRef.current) {
      // customFilters.created_from = String(
      //   sessionObject.sessionVariables.branch_id
      // );

      if("in_transit" in customFilters) {
      let response = await fetch(SERVER_URL + "/report/eway_bill_extension", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paginate: { number_of_rows: pageSize, page_number: pageIndex + 1 },
          sort_fields: sortBy,
          filter_fields: customFilters,
        }),
      });
      let resp = await response.json();
      if (resp["data"] && "total_rows" in resp) {
        setData(resp["data"]);
        setPageCount(Math.ceil(resp["total_rows"] / pageSize));
      }
      setLoading(false);
    }
  }
    // We'll even set a delay to simulate a server here
    //   setTimeout(() => {
    //     // Only update the data if this is the latest fetch
    //     if (fetchId === fetchIdRef.current) {
    //       const startRow = pageSize * pageIndex;
    //       const endRow = startRow + pageSize;
    //     //   setData(serverData.slice(startRow, endRow));
    //       console.log("data", data);
    //       // Your server could send back total page count.
    //       // For now we'll just fake it, too
    //       setPageCount(Math.ceil(serverData.length / pageSize));

    //       setLoading(false);
    //     }
    //   }, 1000);
  },
  []
);

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
      "manually_stopped":0,
      "valid_upto":dateMDY
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
        console.log("datadata", data)
        if (!("data" in data)){
          return;
        }
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
    const stop = (e) => {
      console.log("array",stopResult )
      // console.log("here:",[JSON.parse(stopResult)])
      const fetchData = async () => {
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
        }
          fetchData()
    }
      return (
        <div className='ewb-expiring-today'>
            <Titlebar sessionObject={sessionObject}/>
            {/*<Navbar />*/}
    
            <div className='inner'>
    
              <Card />

              <div className='align-btns'>
                <button className='btn' onClick={stop}>Stop</button>
              </div>
              
            <Background/>
              <div className='wrapper'>
              <ReportTable
                checkbox={true}
                handleCheckboxChange={handleCheckboxChange}
                checkedList={checkedList}
                columns={columns}
                data={data}
                fetchData={fetchData}
                loading={loading}
                pageCount={pageCount}
                isChecked={isChecked}
                getSelectAllValue={getSelectAllValue}
                handleSelectAll={handleSelectAll}
                handleDeselectAll={handleDeselectAll}
                title = "EwbExtensionReport"
              />
              </div>
            </div>
            </div>
            
)
}

export default EwbExpiringToday