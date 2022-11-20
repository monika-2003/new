import React from 'react';
import './Table.css';
import {MdSkipNext} from 'react-icons/md'
import {BiSkipPrevious} from 'react-icons/bi'
import {BiRightArrow} from 'react-icons/bi'
import {BiLeftArrow} from 'react-icons/bi'

const Table = React.forwardRef(({
    columns
}, ref) => {
  return (
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
            {columns.map((Name)=> <td className='search-col'> <input name={Name.Header} placeholder = "Search" className='search-input'/></td>)}
            </tr>

            <tr>
            {columns.map((Name)=> {
                    <td>{Name.accessor}</td>
            })}
            </tr>
            </thead>

            <tbody>


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
  )
}
)

export default Table