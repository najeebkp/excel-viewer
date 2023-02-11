import React, { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import Logo from "../logo.svg";

function SideBar({
  data,
  activeColumns,
  setActiveColumns,
  setTableArray,
  columns,
  setColumns,
  handleViewFullTable,
  viewFullTable,
}) {
  const getColumns = () => {
    if (data && data.length > 0) {
      let items = Object.keys(data[0]);
      setColumns(items);
    }
  };

  const createTable = () => {
    const filteredData = data.map((item) => {
      return activeColumns.reduce((acc, key) => {
        acc[key] = item[key];
        return acc;
      }, {});
    });

    setTableArray(filteredData);
  };
  useEffect(() => {
    getColumns();
  }, [data]);

  useEffect(() => {
    createTable();
  }, [activeColumns]);

  const drag = (e) => {
    e.dataTransfer.setData("text", e.target.innerHTML);
  };

  return (
    <div>
      <Row className="justify-content-center pt-3">
        <Col sm={5}>
          <Row className="justify-content-center">
            <div className="logo">
              <img src={Logo} />
            </div>
          </Row>
        </Col>
      </Row>
      {columns && columns.length > 0 && <div className="h5 py-2">Columns</div>}
      {columns &&
        columns.length > 0 &&
        columns.map((column) => (
          <div className="column-names" draggable onDragStart={drag}>
            {column}
          </div>
        ))}
      {columns && columns.length > 0 && (
        <div className="mt-4">
          <Button size="sm" variant="info" onClick={handleViewFullTable}>
            {viewFullTable ? "Close full table" : "View full table"}
          </Button>
        </div>
      )}
    </div>
  );
}

export default SideBar;
