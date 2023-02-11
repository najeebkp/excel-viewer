import React, { useState } from "react";
import { Container, Col, Row, Form } from "react-bootstrap";
import * as xlsx from "xlsx";
import Charts from "./Charts";
import SideBar from "./SideBar";
import Table from "./Table";

function Main() {
  const [data, setData] = useState([]);
  const [activeColumns, setActiveColumns] = useState([]);
  const [columns, setColumns] = useState([]);
  const [tableArray, setTableArray] = useState([]);
  const [viewFullTable, setViewFullTable] = useState(false);

  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        setData(json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };
  const handleRemoveColumn = (columnName) => {
    let newActiveColumns = activeColumns.filter((item) => item !== columnName);
    setActiveColumns(newActiveColumns);
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };
  const drop = (e) => {
    e.preventDefault();
    var data = e.dataTransfer.getData("text");
    setActiveColumns((prev) => {
      return [...prev, data];
    });
  };

  const handleViewFullTable = () => {
    if (viewFullTable) {
      setViewFullTable(false);
      return;
    }
    setViewFullTable(true);
  };

  return (
    <div>
      <Container fluid>
        <Row>
          <Col sm={2} className="sidebar">
            <SideBar
              data={data}
              activeColumns={activeColumns}
              setActiveColumns={setActiveColumns}
              columns={columns}
              setColumns={setColumns}
              setTableArray={setTableArray}
              handleViewFullTable={handleViewFullTable}
              viewFullTable={viewFullTable}
            />
          </Col>
          <Col sm={10} className="p-0">
            <div
              onDrop={drop}
              onDragOver={allowDrop}
              style={{
                height: "100vh",
                // border: "1px solid red",
              }}
            >
              <Form.Group controlId="formFile" className="upload-file mb-3">
                <Form.Label>Please upload an excel file..</Form.Label>
                <Form.Control type="file" onChange={readUploadFile} />
              </Form.Group>

              <Container fluid>
                {viewFullTable ? (
                  <Row>
                    <Col>
                      <div className="table-wrapper">
                        <Table
                          data={data}
                          handleRemoveColumn={handleRemoveColumn}
                        />
                      </div>
                    </Col>
                  </Row>
                ) : (
                  <Row>
                    <Col>
                      {tableArray &&
                      tableArray.length > 0 &&
                      activeColumns &&
                      activeColumns.length > 0 ? (
                        <div className="table-wrapper">
                          <Table
                            data={tableArray}
                            handleRemoveColumn={handleRemoveColumn}
                          />
                        </div>
                      ) : tableArray && columns.length > 0 ? (
                        <div className="empty-table border-dotted">
                          <div className="empty-icon">
                            <img
                              src={
                                "https://static.vecteezy.com/system/resources/previews/014/905/316/original/upload-drag-and-drop-here-add-new-file-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
                              }
                            />
                          </div>
                          Drag columns to here.
                        </div>
                      ) : (
                        <div className="empty-table">
                          <div className="empty-icon">
                            <img
                              src={"https://www.livemart.lk/img/no_result.png"}
                            />
                          </div>
                          No table to display.<br></br>Please upload an excel
                          file to start.
                        </div>
                      )}
                    </Col>
                    <Col>
                      <Charts data={data} activeColumns={activeColumns} />
                    </Col>
                  </Row>
                )}
              </Container>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Main;
