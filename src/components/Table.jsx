import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useTable } from "react-table";
import { COLUMNS } from "../columns";
import { useData } from "../context/dataContext";
import InfiniteScrollComponent from "react-infinite-scroll-component";

import Loading from "../assets/Loading.gif";

const TableComponent = () => {
  const { data, sliceIndex, setSliceIndex } = useData();
  const update = () => {
    setTimeout(() => {
      setSliceIndex((prev) => prev + 10);
    }, 1000);
  };

  const { headerGroups, prepareRow, rows, getTableBodyProps, getTableProps } =
    useTable({ columns: COLUMNS, data: data.slice(0, sliceIndex) });
  if (!data.length) {
    return (
      <div className="loading">
        <img src={Loading} alt="" />
      </div>
    );
  } else {
    return (
      <InfiniteScrollComponent
        loader="Loading 10 more items"
        hasMore={true}
        dataLength={rows.length}
        next={update}
      >
        <Table responsive {...getTableProps()} hover striped>
          <thead>
            {headerGroups.map((headerGroup) => {
              return (
                <tr>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              );
            })}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </InfiniteScrollComponent>
    );
  }
};

export default TableComponent;
