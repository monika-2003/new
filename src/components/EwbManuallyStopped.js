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
import Content from './Content'
const EwbManuallyStopped = () => {
  const [result,setResult]=useState({})
  useEffect(()=>{
    const fetchData = async () => {
      var response = await fetch("https://run.mocky.io/v3/cc5526a1-dd32-434a-984b-2cf144eb067a", {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Accept":"application/json"
        },
        body: JSON.stringify()
      })
      .then(response=>{return response.json();})
      .then(data=>{setResult(data)})
    }
    fetchData();
    console.log("Data is fetched successfully!",result["data"]);
  },[]);
/*const [result,setResult]=useState({})
  useEffect(()=>{
    const fetchData = async () => {
      var response = await fetch("https://run.mocky.io/v3/1ae6e710-cae7-45d4-b5fd-bffe7c671099", {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Accept":"application/json"
        },
        body: JSON.stringify()
      })
      .then(response=>{return response.json();})
      .then(data=>{setResult(data)})
    }
    fetchData();
    console.log("Data is fetched successfully!",result["data"]);
  },[]);*/
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
                accessor: "eway_bill_no",
                width: "100px",
                minWidth: "10px",
                canFilter: true,
            },
    
            {
                Header: "Date",
                accessor: "ewd_date",
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
            accessor: "from_station",
            width: "100px",
            minWidth: "10px",
            canFilter: true,
          },
    
          {
            Header: "To",
            accessor: "to_station",
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
            accessor: "vehicle_no",
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
          }
    
        ],
        []
    );
    const [data, setData] = React.useState([]);
  const [isStop, setIsStop] = React.useState(false);
  const [popupPassword, setPopupPassword] = React.useState("");
  const [isPasswordCorrect, setIsPasswordCorrect] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const [responseFromServer, setResponseFromServer] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);
  const fetchIdRef = React.useRef(0);
  const sortIdRef = React.useRef(0);

 /* const fetchData = React.useCallback(
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
        let response = await fetch("https://run.mocky.io/v3/cc5526a1-dd32-434a-984b-2cf144eb067a", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paginate: { number_of_rows: pageSize, page_number: pageIndex + 1 },
            sort_fields: sortBy,
            filter_fields: customFilters,
          })
        });
        let resp = await response.json();
        if (resp["data"] && "total_rows" in resp) {
          setData(resp["data"]);
          setPageCount(Math.ceil(resp["total_rows"] / pageSize));
        }
        setLoading(false);
      }},
      []
    );*/
    return(
    <div>
    <Titlebar />
    <Navbar />

    <div className='inner'>

      <Content />

      <Table 
        columns = {columns}
      />
    </div>
</div>)
}

export default EwbManuallyStopped