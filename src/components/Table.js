import React from "react";
import { Table } from "react-bootstrap";

function TableView({ data, handleRemoveColumn }) {
  const headers = Object.keys(data[0]);
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div>{header}</div>
                <div
                  style={{
                    color: "red",
                    paddingLeft: "5px",
                    cursor: "pointer",
                    marginLeft: "auto",
                    fontSize: "10px",
                  }}
                  onClick={() => handleRemoveColumn(header)}
                >
                  x
                </div>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {headers.map((header) => (
              <td key={header}>{row[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TableView;
