import { useState, useMemo } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { SimpleButton, OutlineButton, FilledButton, ModeViewButton } from '../sharedComponents/ButtonComponents';
import CreateFolder from '../sharedComponents/CreateFolder';
import CreateReport from '../sharedComponents/CreateReport';
import { BiSolidFolder, BiDotsVerticalRounded } from "react-icons/bi";
import showChartIcon from '../assets/images/showChartIcon.svg';
import addNewIcon from '../assets/images/addNewIcon.svg';
import deleteIcon from '../assets/images/deleteIcon.svg';
import refreshIcon from '../assets/images/refreshIcon.svg';
import exportExcelIcon from '../assets/images/exportExcelIcon.svg';
import newFolderIcon from '../assets/images/newFolderIcon.svg';
import createNewReportIcon from '../assets/images/createNewReportIcon.svg'
import filterIcon from '../assets/images/filterIcon.svg';
import gridIcon from '../assets/images/gridIcon.svg';
import tabularViewIcon from '../assets/images/tabularViewIcon.svg';
import gridImg1 from '../assets/images/gridImg1.png';
import gridImg2 from '../assets/images/gridImg2.png';
import CreateDashboard from '../sharedComponents/CreateDashboard';


import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useNavigate } from "react-router-dom";
import { tr } from '@faker-js/faker';

function Visualization(props) {

  let navigate = useNavigate();

  const [modeCtrl, setModeCtrl] = useState(false);
  const [folderCreate, setFolderCreate] = useState(false);
  const [reportCreate, setReportCreate] = useState(false);
  const [dashboardCreate, setDashboardCreate] = useState(false);

  function FolderRender(props) {
    const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
    return (
      <div>
        <a href='javascript:;'><BiSolidFolder size='20px' color='#A2AAB6' /></a> {cellValue}
      </div>
    )
  }

  function AvatarRender(props) {
    const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
    return (
      <div className='avatarCricleMain'>
        <dd className='avatarCricle' style={{ backgroundColor: cellValue[0] === 'A' ? "#34AA44" : "#009DE1" }}><i>{cellValue[0]}</i></dd> {cellValue}
      </div>
    )
  }

  // function ShowFolderName(props) {
  //   const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
  //   return (
  //     <>
  //       <div className='myDIV'>sdasdasd</div>
  //       <div className='hide'>show</div>
  //     </>
  //   )
  // }

  // AgGrid data
  const [rowData, setRowData] = useState([
    {
      dashboardName: "Activities by Sales people",
      description: "How many sales person.",
      folder: "Public Report 1",
      createdBy: "Alber Khan",
      location: 'Public Report',
      modifiedOn: "28/2-2024 - 2:00am"
    },
    {
      dashboardName: "Activities by presales",
      description: "How many sales person we have ...",
      folder: "Public Report 2",
      createdBy: "Rija Shakir",
      location: 'Public Report',
      modifiedOn: "28/2-2024 - 2:00am"
    },
    {
      dashboardName: "Activities",
      description: "How many sales person we have ...",
      folder: "Public Report 3",
      createdBy: "Alber Khan",
      location: 'Public Report',
      modifiedOn: "28/2-2024 - 2:00am"
    },
    {
      dashboardName: "Activities by Sales people",
      description: "How many sales person.",
      folder: "Public Report 4",
      createdBy: "Waseem Khan",
      location: 'Public Report',
      modifiedOn: "28/2-2024 - 2:00am"
    },
    {
      dashboardName: "Activities by presales",
      description: "How many sales person we have ...",
      folder: "Public Report 5",
      createdBy: "Alber Khan",
      location: 'Public Report',
      modifiedOn: "28/2-2024 - 2:00am"
    },
    {
      dashboardName: "Activities",
      description: "How many sales person we have ...",
      folder: "Public Report 6",
      createdBy: "junaid Khan",
      location: 'Public Report',
      modifiedOn: "28/2-2024 - 2:00am"
    },
  ]);

  const [colDefs, setColDefs] = useState([
    {
      field: "dashboardName",
      headerName: "Dashboard Name",
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
      cellRenderer: (row) => {
        const rowData = row.data;
        return <a onClick={() => navigate(`/VisualReportGenerationView`)}
          style={{ cursor: 'pointer', color: '#009DE1' }}>{rowData.dashboardName}</a>
      },
    },
    { field: "description", headerName: "Description" },
    { field: "folder", headerName: "Folder", cellRenderer: FolderRender },
    { field: "createdBy", headerName: "Created By", cellRenderer: AvatarRender },
    {
      field: "location", headerName: "Location",
      // tooltipComponentParams: { color: "#000" },
      // tooltipField: "location",
      tooltipValueGetter: (p) =>
        "" + p.value,
      headerTooltip: "",
    },
    { field: "modifiedOn", headerName: "Modified On" }
  ]);

  const defaultColDef = useMemo(() => {
    return {
      resizable: true,
    };
  }, []);

  const onGridReady = (params) => {
    params.api.sizeColumnsToFit();
  };

  const [getRowData, setGetRowData] = useState('');
  const onRowSelected = (event) => {
    const selectedRows = event.api.getSelectedRows();
    setGetRowData(selectedRows)
  };
  console.log('getRowData', getRowData);
  // AgGrid data


  return (
    <div>
      {folderCreate && <CreateFolder folderCreate={folderCreate} setFolderCreate={setFolderCreate} />}
      {reportCreate && <CreateReport reportCreate={reportCreate} setReportCreate={setReportCreate} />}
      {dashboardCreate && <CreateDashboard dashboardCreate={dashboardCreate} setDashboardCreate={setDashboardCreate} />}

      <div className='filterRow clearfix'>
        <FilledButton
          buttonText="Create Dashboard"
          buttonClick={() => setDashboardCreate(true)}
          disabled={false}
          buttonIcon={createNewReportIcon}
        />
        <OutlineButton
          buttonText="New Folder"
          buttonClick={() => setFolderCreate(true)}
          disabled={false}
          buttonIcon={newFolderIcon}
        />
        <div className='filterRowSep'></div>
        <SimpleButton
          buttonText="Export Excel"
          buttonClick={() => console.log('click')}
          disabled={false}
          buttonIcon={exportExcelIcon}
        />
        <SimpleButton
          buttonText="Refresh"
          buttonClick={() => console.log('click')}
          disabled={false}
          buttonIcon={refreshIcon}
        />
        <SimpleButton
          buttonText="Delete"
          buttonClick={() => console.log('click')}
          disabled={false}
          buttonIcon={deleteIcon}
        />
        <SimpleButton
          buttonText="Add New"
          buttonClick={() => console.log('click')}
          disabled={false}
          buttonIcon={addNewIcon}
        />
        <SimpleButton
          buttonText="Show Chart"
          buttonClick={() => console.log('click')}
          disabled={false}
          buttonIcon={showChartIcon}
        />
      </div>
      <Container fluid>
        <Row>
          <Col md={6}><h1>Visualization</h1></Col>
          <Col md={6}>
            <ModeViewButton
              buttonClick={() => setModeCtrl(false)}
              disabled={false}
              activStyle={modeCtrl == false ? "#fff" : ""}
              buttonIcon={tabularViewIcon}
            />
            <ModeViewButton
              buttonClick={() => setModeCtrl(true)}
              disabled={false}
              activStyle={modeCtrl === true ? "#fff" : ""}
              buttonIcon={gridIcon}
            />
            <SimpleButton
              buttonText="Filters"
              buttonClick={() => console.log('click')}
              disabled={false}
              buttonIcon={filterIcon}
            />
            <input type="text" placeholder='Filter by keyword' name='' className='customSearch' />
          </Col>
        </Row>
      </Container>

      {modeCtrl == false ?
        <Row>
          <div id='tableExample3'
            className="ag-theme-quartz" style={{ height: 350 }} >
            <AgGridReact
              onGridReady={onGridReady}
              suppressRowClickSelection={true}
              rowSelection={'multiple'}
              defaultColDef={defaultColDef}
              tooltipShowDelay={0}
              tooltipHideDelay={2000}
              onRowSelected={onRowSelected}
              pagination={true}
              paginationPageSize={6}
              rowData={rowData}
              columnDefs={colDefs}
            />
          </div>
        </Row>
        :
        <Row >
          <div className='gridContainer gridCP'>
            {rowData?.map((item, index) => {
              return (
                <div key={index.toString()} className='gridBox'>
                  <h2>{item.dashboardName} <a href="javascript:;"><BiDotsVerticalRounded color='#A4A5A9' size={24} /></a></h2>
                  <img src={item.createdBy[0] === 'A' ? gridImg1 : gridImg2} alt="" />
                  <p><span style={{ backgroundColor: item.createdBy[0] === 'A' ? "#34AA44" : "#009DE1" }}>
                    {item.createdBy[0]}</span> <i>Modified:{item.modifiedOn}</i></p>
                </div>
              )
            })}
          </div>
        </Row>}

    </div>
  )
}

export default Visualization;
