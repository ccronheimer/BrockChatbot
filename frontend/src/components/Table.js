import React, { useMemo } from "react";

import { useGlobalFilter, useTable } from "react-table";
import { GlobalSearch } from "./GlobalSearch";

const Table = (props) => {
    const data = useMemo(() => [...props.data], [props.data]);

  const columns = props.columns;
  

  const tableInstance = useTable(
    { columns: columns, data: data },
    useGlobalFilter
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = tableInstance;

  return (
    <>
      {/* <GlobalSearch
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={state.globalFilter}
      /> */}
      <table {...getTableProps()}>
        <thead>
          {
            // Loop over the header rows
            headerGroups.map((headerGroup) => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column) => (
                    // Apply the header cell props
                    <th {...column.getHeaderProps()}>
                      {
                        // Render the header
                        column.render("Header")
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map((row) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      if(props.type === "Athlete") {
                        return (
                         
                         <td  className="athlete" {...cell.getCellProps()}>
                           {
                             // Render the cell contents
                             cell.render("Cell")
                           }
                         </td>
                       );
                      }
                      if(props.type === "Schedule") {
                        return (
                         
                         <td  className="schedule" {...cell.getCellProps()}>
                           {
                             // Render the cell contents
                             cell.render("Cell")
                           }
                         </td>
                       );
                      }
                      if(props.type === "Medal") {
                        return (
                         
                         <td className="medal" {...cell.getCellProps()}>
                           {
                             // Render the cell contents
                             cell.render("Cell")
                           }
                         </td>
                       );
                      }
                     
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </>
  );
}

export default Table