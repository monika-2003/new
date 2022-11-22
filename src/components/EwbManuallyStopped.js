import React from 'react'
import Navbar from './Navbar'
import Titlebar from './Titlebar'
import './EwbExpiringToday.css'
import Table from './Table'
import Content from './Content'

const EwbManuallyStopped = () => {

    const columns = React.useMemo(
        () => [
            {
                Header: "Number",
                accessor: "number",
                width: "100px",
                minWidth: "10px",
                canFilter: true,
            },
    
            {
                Header: "Date",
                accessor: "date",
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
            accessor: "from",
            width: "100px",
            minWidth: "10px",
            canFilter: true,
          },
    
          {
            Header: "To",
            accessor: "to",
            width: "100px",
            minWidth: "10px",
            canFilter: true,
          },
    
          {
            Header: "Consignor",
            accessor: "consignor",
            width: "100px",
            minWidth: "10px",
            canFilter: true,
          },
    
          {
            Header: "Consignee",
            accessor: "consignee",
            width: "100px",
            minWidth: "10px",
            canFilter: true,
          },
    
          {
            Header: "CEWB",
            accessor: "cewb",
            width: "100px",
            minWidth: "10px",
            canFilter: true,
          },
    
          {
            Header: "Truck No",
            accessor: "truck",
            width: "100px",
            minWidth: "10px",
            canFilter: true,
          },
    
          {
            Header: "Status",
            accessor: "status",
            width: "100px",
            minWidth: "10px",
            canFilter: true,
          },
            
        ],
        []
    );

    
  return (
    <div>
        <Titlebar />
        <Navbar />

        <div className='inner'>

          <Content />

          <Table 
            columns = {columns}
          />
        </div>
    </div>
  )
}

export default EwbManuallyStopped