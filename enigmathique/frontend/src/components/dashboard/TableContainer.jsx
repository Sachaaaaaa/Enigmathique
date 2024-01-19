import React from 'react';
import PropTypes from 'prop-types';

const TableContainer = (props) => {
    const {headers, children} = props;

    const length = headers.length;
    return (
        <table className="w-full min-w-[550px] primary-font-color ">
				<thead className='w-full '>
					<tr className=" w-full text-left">
                        {headers.map((title, index) => (
                            <th key={index} className={`${index == 0 ? "pl-5" : ""} table-title ${index == length-1 ? "text-right pr-5" : ""}`}>{title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {children}  
                </tbody>
        </table>
    )
}

TableContainer.propTypes = {
    headers: PropTypes.array.isRequired,
    children: PropTypes.node,
}

export default TableContainer;