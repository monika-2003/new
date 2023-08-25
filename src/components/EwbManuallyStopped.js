import React, { useState, useEffect } from "react";
import { SERVER_URL, ACCESS_TOKEN, USE_OVERLAY } from "../config/config.js";
import Navbar from './Navbar'
import Titlebar from './Titlebar'
import './EwbExpiringToday.css'
import ReportTable from "./ReportTable";
import Card from './Card'
import Background from "./Background.js";
// import LoadingOverlay from "react-loading-overlay";
const EwbManuallyStopped = ({sessionObject}) => {
    const [overlay, setOverlay] = useState(false);
    const [checkedList, setCheckedList] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [pageCount, setPageCount] = React.useState(0);
    const [data, setData] = React.useState([]);
    const fetchIdRef = React.useRef(0);

    var ACCESS_TOKEN = null

    let date=new Date()
    let dateMDY = `${date.getFullYear()}-${(date.getMonth() + 1)<10?('0'+(date.getMonth() + 1)):date.getMonth() + 1}-${date.getDate()<10?('0'+(date.getDate())):date.getDate()}`+" 23:59:00"; 
    let dateMDY2 = `${date.getFullYear()}-${(date.getMonth() + 1)<10?('0'+(date.getMonth() + 1)):date.getMonth() + 1}-${date.getDate()<10?('0'+(date.getDate())):date.getDate()}`; 



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

        let report_type = localStorage.getItem("report_type")
        if (report_type == "expiring_today"){
          customFilters.valid_upto = dateMDY;
        }
        if (report_type == "extended_today"){
          customFilters.last_extended = dateMDY2;
        }
        if (report_type == "manually_stopped"){
          customFilters.manually_stopped = "1";
        }
        if (report_type == "expied_last_week"){
          customFilters.expired_last_week = true;
        }
        if (report_type == "all"){
        }


  
        if (fetchId === fetchIdRef.current) {
          ACCESS_TOKEN = "Bearer "+localStorage.getItem('login')
          var response = await fetch(SERVER_URL+"/eway/db/", {
            method:"POST",
            headers:{
              "Content-Type":"application/json",
              "Accept":"application/json",
              "Authorization":ACCESS_TOKEN
            },
            body:JSON.stringify({
              "paginate": {
                "number_of_rows": pageSize,
                page_number: pageIndex + 1
              },
              "sort_fields": [
                {}
              ],
              "filter_fields": customFilters
            })
          })
          let temp_data = await response.json();
          console.log("datadata", temp_data)
          if (!("data" in temp_data)){
            return;
          }
          setData(temp_data.data)
          setPageCount(Math.ceil(temp_data["total_rows"] / pageSize));
        }
        setLoading(false);
      },
      []
    );


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

    const getSelectAllValue = () => {
      const isAllSelected = checkedList.length == data.length;
      return isAllSelected;
    }

    const isChecked = (row) => {
      const val = row[0].value;
      return (checkedList.indexOf(val) > -1);
    }

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

    const handleSelectAll = () => {
      let tempChecked = [];
      data.forEach((row) => {
          tempChecked.push(row.ewaybill_no);
      })
      setCheckedList(tempChecked);
    }

    const handleDeselectAll = () => {
        setCheckedList([]);
    }
    

    const start = async (e) => {
      ACCESS_TOKEN = "Bearer "+localStorage.getItem('login');
      setOverlay(true)
      const rs = await fetch(SERVER_URL+"/eway/eway_bill_start/", {
        method:"POST",
        headers: {
          "Content-Type":"application/json",
            "Accept":"application/json",
            "Authorization":ACCESS_TOKEN
        },
        body:JSON.stringify({"data": checkedList})
      })
        const data = await rs.json();
        // fetchData()
        setOverlay(false)
        window.location.reload()
    }

    const stop = async (e) => {
      ACCESS_TOKEN = "Bearer "+localStorage.getItem('login');
      setOverlay(true)
      const rs = await fetch(SERVER_URL+"/eway/eway_bill_stop/", {
        method:"POST",
        headers: {
          "Content-Type":"application/json",
            "Accept":"application/json",
            "Authorization":ACCESS_TOKEN
        },
        body:JSON.stringify({"data": checkedList})
      })
      const data = await rs.json();
      setOverlay(false)
      window.location.reload()
    }

    const getButtons = () => {
      let report_type = localStorage.getItem("report_type")
      if (report_type == "expiring_today"){
        return (
          <button className='btn' onClick={stop}>Stop</button>
        )
      }
      if (report_type == "extended_today"){
        return (
          <button className='btn' onClick={stop}>Stop</button>
        )
      }
      if (report_type == "manually_stopped"){
        return (
          <button className='btn' onClick={start}>Start</button>
        )
      }
      if (report_type == "expied_last_week"){
        return (
          <></>
        )
      }
      if (report_type == "all"){
        return (
          <></>
        )
      }
    }

      return (
        <div className='ewb-expiring-today'>

            <Titlebar sessionObject={sessionObject}/>
    
            <div className='inner'>
    
              <Card />
              
              <div className='align-btns'>
              {getButtons()}
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

export default EwbManuallyStopped